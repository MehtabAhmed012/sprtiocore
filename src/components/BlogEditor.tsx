import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Edit2, Trash2, Save, Loader2, Image as ImageIcon, Share2, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db, handleFirestoreError, OperationType, logout, storage } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUser } from '../lib/UserContext';

import { OFFICIAL_BLOG_POSTS } from '../constants/blogData';

export default function BlogEditor() {
  const { role, user } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      console.log("Real-time fetched posts:", fetchedPosts);
      
      if (fetchedPosts.length === 0) {
        setPosts(OFFICIAL_BLOG_POSTS.map(post => ({ 
          ...post, 
          id: post.slug, // Use slug as fallback ID for keys
          status: post.status || 'published', 
          createdAt: { toDate: () => new Date() } 
        })));
      } else {
        setPosts(fetchedPosts);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error in real-time posts listener:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchPosts = () => {
    // No longer needed with onSnapshot, but keeping as a no-op to avoid breaking other calls if any
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleJsonUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        setSaving(true);
        const json = JSON.parse(event.target?.result as string);
        const postsToUpload = Array.isArray(json) ? json : [json];
        
        if (!confirm(`Found ${postsToUpload.length} articles in JSON. Import them now?`)) {
          setSaving(false);
          return;
        }

        for (const post of postsToUpload) {
          // Ensure mandatory fields
          const processedPost = {
            ...post,
            title: post.title || 'Untitled Article',
            slug: post.slug || generateSlug(post.title || 'Untitled'),
            status: post.status || 'draft',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            author: post.author || 'SpatioCore Team',
            category: post.category || 'GIS Analysis'
          };
          await addDoc(collection(db, 'blog_posts'), processedPost);
        }

        alert('Batch import successful!');
      } catch (err: any) {
        console.error("JSON Import Error:", err);
        alert("Failed to parse or upload JSON. Ensure it's a valid array of post objects.");
      } finally {
        setSaving(false);
        if (e.target) e.target.value = ''; // Reset input
      }
    };
    reader.readAsText(file);
  };

  const seedBlogPosts = async () => {
    if (!confirm('This will seed the 6 official SpatioCore technical articles with the complete structural data from the constants file. Continue?')) return;
    setSaving(true);
    
    // Add server timestamps to the constant data before seeding
    const seeds = OFFICIAL_BLOG_POSTS.map(post => ({
      ...post,
      createdAt: serverTimestamp()
    }));

    try {
      for (const post of seeds) {
        await addDoc(collection(db, 'blog_posts'), post);
      }
      fetchPosts();
      alert('Seeding complete! 6 technical articles with detailed structured data uploaded.');
    } catch (e: any) {
      console.error(e);
      alert('Seeding failed: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const processImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Invalid file type. Please upload an image (PNG, JPG, WEBP).');
      return;
    }

    // Limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large. Please upload an image smaller than 5MB.');
      return;
    }

    setUploadingImage(true);
    try {
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      const storageRef = ref(storage, `blog_images/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setCurrentPost({ ...currentPost, image: downloadURL });
    } catch (error: any) {
      console.error("Image upload failed:", error);
      alert(`Upload failed: ${error.message || 'Check your internet connection or Firebase permissions.'}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
      e.target.value = ''; // Reset input
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const postData = {
        ...currentPost,
        updatedAt: serverTimestamp(),
        createdAt: currentPost.createdAt || serverTimestamp(),
        status: currentPost.status || 'published'
      };

      if (currentPost.id) {
        await updateDoc(doc(db, 'blog_posts', currentPost.id), postData);
      } else {
        await addDoc(collection(db, 'blog_posts'), postData);
      }
      
      setIsEditing(false);
      fetchPosts();
      alert(`Article ${currentPost.id ? 'updated' : 'created'} successfully.`);
    } catch (error: any) {
      alert('Save failed: ' + error.message);
      handleFirestoreError(error, OperationType.WRITE, 'blog_posts');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    console.log("Attempting to delete post with ID:", id);
    try {
      setSaving(true);
      const postRef = doc(db, 'blog_posts', id);
      console.log("Document reference created for path:", postRef.path);
      await deleteDoc(postRef);
      console.log("Delete operation successfully called for ID:", id);
      alert('Article deleted successfully.');
      setDeleteConfirmId(null);
    } catch (error: any) {
      console.error("Delete operation failed for ID:", id, error);
      alert('Delete failed: ' + error.message);
      handleFirestoreError(error, OperationType.DELETE, `blog_posts/${id}`);
    } finally {
      setSaving(false);
    }
  };

  if (!role || (role !== 'admin' && role !== 'editor')) return null;

  return (
    <div className="py-24 bg-bg-base/50 relative overflow-hidden">
      <div className="absolute inset-0 topo-bg opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center mb-12 border-b border-primary/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link to="/" className="text-primary hover:underline text-xs flex items-center gap-1 mb-2">
                &larr; Back to Website
              </Link>
            </div>
            <h2 className="font-display text-4xl font-bold">Admin Console</h2>
            <p className="text-text-muted">Manage SpatioCore blog articles and platform insights.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{user?.displayName}</p>
              <p className="text-[10px] text-primary/60 font-mono uppercase tracking-widest">{role}</p>
            </div>
            <button 
              onClick={() => document.getElementById('json-upload')?.click()}
              className="flex items-center text-[10px] font-mono text-primary hover:text-white transition-all uppercase tracking-widest border border-primary/20 px-3 py-1.5 rounded-lg whitespace-nowrap bg-primary/5 hover:bg-primary/10"
              disabled={saving}
            >
              <Share2 size={12} className="mr-2" />
              {saving ? 'Processing...' : 'Upload JSON'}
            </button>
            <input 
              id="json-upload"
              type="file" 
              accept=".json"
              onChange={handleJsonUpload}
              className="hidden"
            />
            <button 
              onClick={seedBlogPosts}
              className="hidden md:block text-[10px] font-mono text-text-muted hover:text-primary transition-all uppercase tracking-widest"
              disabled={saving}
            >
              Seed Official Data
            </button>
            <button 
              onClick={() => logout()}
              className="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all"
              title="Logout"
            >
              <X size={20} />
            </button>
            <button 
              onClick={() => {
                setCurrentPost({ 
                  title: '', 
                  slug: '', 
                  excerpt: '', 
                  content: '', 
                  category: 'Remote Sensing', 
                  image: '', 
                  author: 'SpatioCore Team',
                  status: 'draft' 
                });
                setIsEditing(true);
              }}
              className="flex items-center gap-2 bg-primary text-[#0a0f1e] px-8 py-4 rounded-[20px] font-bold hover:shadow-[0_0_20px_rgba(0,201,167,0.4)] transition-all"
            >
              <Plus size={20} /> Create New
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.length === 0 && (
              <div className="bg-white/5 border border-dashed border-primary/20 rounded-[30px] p-20 text-center">
                <p className="text-text-muted mb-6">No articles found in the repository.</p>
                <button onClick={seedBlogPosts} className="text-primary font-bold hover:underline">
                  Seed Database with Official SpatioCore Content
                </button>
              </div>
            )}
            {posts.map(post => (
              <div key={post.id} className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-lg bg-primary/10 overflow-hidden flex items-center justify-center">
                     {post.image && post.image.trim() ? <img src={post.image} className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-primary/40" />}
                   </div>
                   <div>
                     <div className="flex items-center gap-2">
                       <h3 className="font-bold text-lg">{post.title}</h3>
                       {post.isOfficial && (
                         <span className="text-[8px] bg-primary text-[#0a0f1e] px-1.5 py-0.5 rounded font-black tracking-tighter uppercase">Official</span>
                       )}
                       <span className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded border ${
                         post.status === 'published' 
                           ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                           : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                       }`}>
                         {post.status || 'draft'}
                       </span>
                       <Link 
                         to={`/blog/${post.slug || post.id}`} 
                         target="_blank"
                         className="text-primary hover:text-white transition-colors"
                         title="View Live"
                       >
                         <Share2 size={14} />
                       </Link>
                     </div>
                     <p className="text-sm text-text-muted">{post.category} • {post.author}</p>
                   </div>
                </div>
                <div className="flex gap-3">
                  {deleteConfirmId === post.id ? (
                    <div className="flex gap-2 animate-in fade-in slide-in-from-right-2">
                       <button 
                        onClick={() => handleDelete(post.id)}
                        disabled={saving}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-all flex items-center gap-1"
                      >
                        {saving ? <Loader2 size={14} className="animate-spin" /> : 'Confirm?'}
                      </button>
                      <button 
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button 
                        onClick={() => {
                          setCurrentPost(post);
                          setIsEditing(true);
                        }}
                        className="p-3 bg-white/5 hover:bg-primary/20 rounded-xl transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirmId(post.id)}
                        className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-bg-base/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-card-base border border-primary/20 rounded-[40px] p-10 relative z-10 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsEditing(false)}
                className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <h3 className="font-display text-2xl font-bold mb-8">
                {currentPost.id ? 'Edit Article' : 'New Article'}
              </h3>

              <form onSubmit={handleSave} className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Article Title</label>
                  <input 
                    required 
                    type="text" 
                    value={currentPost.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = generateSlug(title);
                      setCurrentPost({ ...currentPost, title, slug });
                    }}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none" 
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Slug (URL friendly)</label>
                  <input 
                    required 
                    type="text" 
                    value={currentPost.slug || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, slug: generateSlug(e.target.value) })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none font-mono text-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Category</label>
                  <select 
                    value={currentPost.category}
                    onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none appearance-none cursor-pointer text-text-base border-r-8 border-transparent"
                  >
                    <option className="bg-white dark:bg-[#0a0f1e] text-black dark:text-white">Remote Sensing</option>
                    <option className="bg-white dark:bg-[#0a0f1e] text-black dark:text-white">GIS Analysis</option>
                    <option className="bg-white dark:bg-[#0a0f1e] text-black dark:text-white">Health GIS</option>
                    <option className="bg-white dark:bg-[#0a0f1e] text-black dark:text-white">Urban Planning</option>
                    <option className="bg-white dark:bg-[#0a0f1e] text-black dark:text-white">Agriculture</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Status</label>
                    <select 
                      value={currentPost.status || 'draft'}
                      onChange={(e) => setCurrentPost({ ...currentPost, status: e.target.value })}
                      className="w-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none appearance-none cursor-pointer text-text-base"
                    >
                      <option value="draft" className="bg-white dark:bg-[#0a0f1e] text-black dark:text-white">Draft</option>
                      <option value="published" className="bg-white dark:bg-[#0a0f1e] text-black dark:text-white">Published</option>
                    </select>
                </div>
                <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3">
                  <input 
                    type="checkbox" 
                    id="isOfficial"
                    checked={currentPost.isOfficial || false}
                    onChange={(e) => setCurrentPost({ ...currentPost, isOfficial: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="isOfficial" className="text-sm font-bold cursor-pointer">Official Article (SpatioCore Expert Data)</label>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Author Name</label>
                  <input 
                    type="text" 
                    value={currentPost.author}
                    onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none" 
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Image URL & Upload</label>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input 
                        type="url" 
                        placeholder="https://..."
                        value={currentPost.image}
                        onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none" 
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      disabled={uploadingImage}
                      className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl px-6 py-3 transition-all disabled:opacity-50"
                    >
                      {uploadingImage ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                      <span className="text-xs font-bold uppercase tracking-widest">Upload</span>
                    </button>
                    <input 
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  
                  {/* Drag and Drop Area */}
                  <div 
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={async (e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files[0];
                      if (file) {
                        processImageFile(file);
                      }
                    }}
                    className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group relative overflow-hidden ${
                      isDragging 
                        ? 'border-primary bg-primary/5 scale-[0.99]' 
                        : 'border-primary/10 hover:border-primary/40'
                    }`}
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    {uploadingImage && (
                      <div className="absolute inset-0 bg-bg-base/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                        <Loader2 className="animate-spin text-primary mb-2" size={32} />
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary">Uploading Artifact...</p>
                      </div>
                    )}

                    {currentPost.image ? (
                      <div className="relative inline-block group/preview">
                        <img 
                          src={currentPost.image} 
                          alt="Preview" 
                          className="max-h-48 rounded-lg mx-auto mb-2 shadow-2xl transition-transform group-hover/preview:scale-[1.02]" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 flex items-center justify-center rounded-lg transition-opacity border border-primary/40">
                          <div className="bg-[#0a0f1e] text-primary p-2 rounded-lg shadow-xl">
                            <Upload size={20} />
                          </div>
                        </div>
                        <p className="text-[10px] text-text-muted mt-2">Click or drag to replace satellite visual</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-4">
                        <div className={`p-4 rounded-full mb-4 transition-colors ${isDragging ? 'bg-primary/20' : 'bg-primary/5'}`}>
                          <Upload size={40} className={`transition-all ${isDragging ? 'text-primary scale-110' : 'text-primary/40 group-hover:text-primary'}`} />
                        </div>
                        <p className="text-sm font-bold text-text-muted mb-1">
                          {isDragging ? 'Release to upload image' : 'Drag & drop satellite imagery'}
                        </p>
                        <p className="text-[10px] text-text-muted uppercase tracking-widest opacity-60">or click to browse local storage</p>
                        <div className="mt-4 flex gap-2">
                          <span className="text-[8px] px-2 py-0.5 border border-primary/20 rounded-full font-mono">PNG</span>
                          <span className="text-[8px] px-2 py-0.5 border border-primary/20 rounded-full font-mono">JPG</span>
                          <span className="text-[8px] px-2 py-0.5 border border-primary/20 rounded-full font-mono">WEBP</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Excerpt (Brief Summary)</label>
                  <textarea 
                    required 
                    rows={2} 
                    value={currentPost.excerpt}
                    onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none resize-none"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Tools (Comma separated)</label>
                  <input 
                    type="text" 
                    value={Array.isArray(currentPost.tools) ? currentPost.tools.join(', ') : currentPost.tools || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, tools: e.target.value.split(',').map((s: string) => s.trim()) })}
                    placeholder="e.g. ArcGIS Pro, QGIS, Python"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none" 
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">SpatioCore Edge (Differentiator)</label>
                  <input 
                    type="text" 
                    value={currentPost.differentiator || ''}
                    onChange={(e) => setCurrentPost({ ...currentPost, differentiator: e.target.value })}
                    placeholder="What makes this service unique?"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none" 
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-mono font-bold uppercase tracking-widest text-text-muted">Main Content</label>
                  <textarea 
                    required 
                    rows={8} 
                    value={currentPost.content}
                    onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-5 py-3 focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="col-span-2 pt-4">
                  <button 
                    disabled={saving}
                    className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 ${
                      currentPost.status === 'published' 
                        ? 'bg-primary text-[#0a0f1e] hover:shadow-[0_0_20px_rgba(0,201,167,0.4)]' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {saving ? <Loader2 size={20} className="animate-spin" /> : (
                      <>
                        <Save size={20} /> 
                        {currentPost.status === 'published' ? 'Update & Publish' : 'Save as Draft'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
