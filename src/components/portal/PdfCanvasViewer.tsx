/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface PdfCanvasViewerProps {
  fileUrl: string;
  title: string;
  viewOnlyStrict?: boolean;
  onOpenNewTab?: () => void;
}

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export default function PdfCanvasViewer({ fileUrl, title, viewOnlyStrict = false, onOpenNewTab }: PdfCanvasViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const pdfDocRef = useRef<any>(null);
  const canvasRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({});
  const renderTasksRef = useRef<{ [key: number]: any }>({});

  // Ensure PDF.js is loaded
  const getPdfJsLib = async (): Promise<any> => {
    if (window.pdfjsLib) {
      return window.pdfjsLib;
    }
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[src*="pdf.min.js"]');
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve(window.pdfjsLib));
        existingScript.addEventListener('error', () => reject(new Error('Failed to load PDF.js')));
        // If already loaded in between
        if (window.pdfjsLib) resolve(window.pdfjsLib);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('PDF.js unavailable'));
        }
      };
      script.onerror = () => reject(new Error('Failed to fetch PDF engine'));
      document.head.appendChild(script);
    });
  };

  // Load Document
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    const loadDoc = async () => {
      try {
        const pdfjs = await getPdfJsLib();
        if (isCancelled) return;
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const loadingTask = pdfjs.getDocument(fileUrl);
        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);
        setCurrentPage(1);
        setLoading(false);
      } catch (err: any) {
        if (!isCancelled) {
          console.error('PDF load error:', err);
          setError(err?.message || 'Could not load PDF directly');
          setLoading(false);
        }
      }
    };

    loadDoc();

    return () => {
      isCancelled = true;
      // Cancel active render tasks
      Object.values(renderTasksRef.current).forEach((task: any) => {
        try {
          task?.cancel?.();
        } catch {}
      });
      renderTasksRef.current = {};
    };
  }, [fileUrl]);

  // Render individual page onto its canvas
  const renderPage = async (pageNum: number) => {
    const pdf = pdfDocRef.current;
    const canvas = canvasRefs.current[pageNum];
    if (!pdf || !canvas) return;

    // Cancel existing render on this canvas
    if (renderTasksRef.current[pageNum]) {
      try {
        renderTasksRef.current[pageNum].cancel();
      } catch {}
      delete renderTasksRef.current[pageNum];
    }

    try {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const context = canvas.getContext('2d');
      if (!context) return;

      const outputScale = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

      const renderContext = {
        canvasContext: context,
        transform: transform,
        viewport: viewport,
      };

      const renderTask = page.render(renderContext);
      renderTasksRef.current[pageNum] = renderTask;
      await renderTask.promise;
    } catch (err: any) {
      if (err?.name !== 'RenderingCancelledException') {
        console.warn(`Render page ${pageNum} notice:`, err);
      }
    }
  };

  // Re-render all pages when scale or numPages change
  useEffect(() => {
    if (!pdfDocRef.current || numPages === 0) return;

    for (let p = 1; p <= numPages; p++) {
      renderPage(p);
    }
  }, [scale, numPages]);

  const handleZoomIn = () => setScale((prev) => Math.min(2.5, +(prev + 0.2).toFixed(1)));
  const handleZoomOut = () => setScale((prev) => Math.max(0.6, +(prev - 0.2).toFixed(1)));
  const handleResetZoom = () => setScale(1.2);

  const scrollToPage = (pageNum: number) => {
    const target = canvasRefs.current[pageNum];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentPage(pageNum);
    }
  };

  return (
    <div 
      className="w-full h-full flex flex-col bg-slate-900 select-none overflow-hidden"
      onContextMenu={(e) => {
        if (viewOnlyStrict) e.preventDefault();
      }}
    >
      
      {/* Floating Bottom Toolbar for Zoom and Page Tracking */}
      <div className="shrink-0 px-4 py-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 z-10 select-none">
        <div className="flex items-center gap-2">
          {numPages > 1 && (
            <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700">
              <button
                onClick={() => {
                  const prev = Math.max(1, currentPage - 1);
                  scrollToPage(prev);
                }}
                disabled={currentPage <= 1}
                className="p-0.5 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="font-mono text-[11px] px-1 font-semibold">
                Page <span className="text-[#00c9a7]">{currentPage}</span> of {numPages}
              </span>
              <button
                onClick={() => {
                  const next = Math.min(numPages, currentPage + 1);
                  scrollToPage(next);
                }}
                disabled={currentPage >= numPages}
                className="p-0.5 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                title="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}

          <div className="text-[11px] text-slate-400 font-mono hidden sm:inline">
            {viewOnlyStrict ? '🔒 View-Only Mode' : 'High-Resolution Vector Canvas'}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700">
          <button
            onClick={handleZoomOut}
            className="p-1 hover:text-white rounded hover:bg-slate-700 cursor-pointer"
            title="Zoom Out (-)"
          >
            <ZoomOut size={13} />
          </button>
          <button
            onClick={handleResetZoom}
            className="px-1 text-[11px] font-mono hover:text-[#00c9a7] cursor-pointer"
            title="Reset Zoom to 100%"
          >
            {Math.round(scale * 100 / 1.2)}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1 hover:text-white rounded hover:bg-slate-700 cursor-pointer"
            title="Zoom In (+)"
          >
            <ZoomIn size={13} />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700 cursor-pointer ml-0.5"
            title="Fit to Width"
          >
            <RotateCcw size={11} />
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Viewport */}
      <div 
        ref={containerRef}
        className="flex-1 w-full overflow-y-auto overflow-x-auto p-4 sm:p-6 flex flex-col items-center gap-6 bg-[#0a0f1d]"
        onScroll={(e) => {
          // Detect current page from scroll position
          const container = e.currentTarget;
          const containerTop = container.scrollTop + container.clientHeight / 3;
          for (let p = 1; p <= numPages; p++) {
            const canvas = canvasRefs.current[p];
            if (canvas) {
              const top = canvas.offsetTop;
              const bottom = top + canvas.offsetHeight;
              if (containerTop >= top && containerTop <= bottom) {
                if (currentPage !== p) setCurrentPage(p);
                break;
              }
            }
          }
        }}
      >
        {/* Loading Indicator */}
        {loading && (
          <div className="my-auto flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3">
            <Loader2 className="animate-spin text-[#00c9a7]" size={36} />
            <div className="text-sm font-semibold text-slate-200">
              Rendering Official PDF...
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Unpacking vector graphics and typography
            </div>
          </div>
        )}

        {/* Error Fallback */}
        {error && !loading && (
          <div className="my-auto flex flex-col items-center justify-center p-8 max-w-md text-center bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
            <AlertCircle className="text-amber-400" size={40} />
            <div className="space-y-1">
              <h4 className="font-bold text-slate-100 text-sm">
                Document Ready in Standalone Viewer
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Chrome restricted embedded preview in this container. You can view the complete official PDF in a separate tab with full native tools.
              </p>
            </div>
            <button
              onClick={() => {
                if (onOpenNewTab) onOpenNewTab();
                else window.open(fileUrl, '_blank', 'noopener,noreferrer');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00c9a7] hover:bg-[#00b093] text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <ExternalLink size={14} />
              <span>Open Complete PDF in New Tab</span>
            </button>
          </div>
        )}

        {/* Rendered PDF Canvas Stack */}
        {!loading && !error && numPages > 0 && (
          <div className="flex flex-col items-center gap-6 py-2">
            {Array.from({ length: numPages }, (_, index) => {
              const pageNum = index + 1;
              return (
                <div 
                  key={pageNum}
                  className="relative bg-white shadow-2xl rounded-[2px] overflow-hidden transition-all duration-150 border border-slate-300 dark:border-slate-800"
                >
                  <canvas
                    ref={(el) => {
                      canvasRefs.current[pageNum] = el;
                    }}
                    className="block max-w-full"
                  />
                  <div className="absolute bottom-2 right-2 bg-slate-900/80 text-white/90 px-2 py-0.5 rounded text-[10px] font-mono pointer-events-none">
                    Page {pageNum} of {numPages}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
