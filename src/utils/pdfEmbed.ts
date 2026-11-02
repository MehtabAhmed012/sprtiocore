/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Transforms any OneDrive or Google Drive URL (or direct PDF URL) into an
 * embeddable iframe preview URL.
 */
/**
 * Transforms any OneDrive or Google Drive URL (or direct PDF URL) into an
 * embeddable iframe preview URL that renders cleanly without "refused to connect" blocks.
 */
export function formatPdfEmbedUrl(rawUrl: string): string {
  if (!rawUrl) return '/documents/Brochure.pdf';
  const trimmed = rawUrl.trim();

  // If already a local PDF path or api stream path
  if (trimmed.startsWith('/') || trimmed.startsWith('blob:') || trimmed.startsWith('data:')) {
    return trimmed;
  }

  // Microsoft OneDrive:
  if (trimmed.includes('1drv.ms') || trimmed.includes('onedrive.live.com')) {
    return `/api/pdf-stream?url=${encodeURIComponent(trimmed)}`;
  }

  // Google Drive: Convert view/edit/share links into /preview for clean iframe embed
  if (trimmed.includes('drive.google.com')) {
    const fileIdMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    }
    const openIdMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (openIdMatch && openIdMatch[1]) {
      return `https://drive.google.com/file/d/${openIdMatch[1]}/preview`;
    }
    const ucIdMatch = trimmed.match(/\/uc\?[^#]*id=([a-zA-Z0-9_-]+)/);
    if (ucIdMatch && ucIdMatch[1]) {
      return `https://drive.google.com/file/d/${ucIdMatch[1]}/preview`;
    }
  }

  return trimmed;
}

/**
 * Returns a direct download URL for the document.
 */
export function getPdfDownloadUrl(rawUrl: string): string {
  if (!rawUrl) return '/documents/Brochure.pdf';
  if (rawUrl.startsWith('/')) {
    return rawUrl;
  }
  if (rawUrl.includes('1drv.ms') || rawUrl.includes('onedrive.live.com')) {
    return `/api/pdf-stream?url=${encodeURIComponent(rawUrl)}&download=1`;
  }
  return rawUrl;
}

