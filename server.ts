import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Set headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

  // Explicitly serve /OfficialPDF with open framing headers for pdf iframes
  app.get([
    '/OfficialPDF/brochures/SpatioCore_Corporate_Brochure_2026.pdf',
    '/OfficialPDF/brochures/SpatioCore_Corporate_Brochure_2026.pdf.pdf',
    '/OfficialPDF/brochures/brochures.pdf.pdf',
    '/OfficialPDF/brochures/brochure.pdf'
  ], (req, res) => {
    const targetFile = path.resolve(process.cwd(), 'public/OfficialPDF/brochures/brochures.pdf');
    if (fs.existsSync(targetFile)) {
      res.removeHeader('X-Frame-Options');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Type', 'application/pdf');
      return res.sendFile(targetFile);
    }
    res.redirect('/OfficialPDF/brochures/brochures.pdf');
  });

  app.use('/OfficialPDF', (req, res, next) => {
    res.removeHeader('X-Frame-Options');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  }, express.static(path.resolve(process.cwd(), 'public/OfficialPDF')));

  // Explicitly serve /documents with open framing headers for pdf iframes
  app.use('/documents', (req, res, next) => {
    res.removeHeader('X-Frame-Options');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  }, express.static(path.resolve(process.cwd(), 'public/documents')));

  // PDF Memory Cache
  const pdfCache = new Map<string, { buffer: Buffer; contentType: string; filename: string; timestamp: number }>();

  // Resolve OneDrive share link into readable PDF stream
  async function resolveOneDrivePdf(shareUrl: string): Promise<{ buffer: Buffer; contentType: string; filename: string }> {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

    // Step 1: Follow initial 1drv.ms redirect
    const r1 = await fetch(shareUrl, { redirect: 'manual' });
    const loc1 = r1.headers.get('location');
    if (!loc1) {
      throw new Error('Initial OneDrive redirect failed');
    }

    // Step 2: Append &download=1 to bypass web app wrapper
    const sep = loc1.includes('?') ? '&' : '?';
    const downloadTry = loc1.includes('download=1') ? loc1 : `${loc1}${sep}download=1`;
    const r2 = await fetch(downloadTry, {
      redirect: 'manual',
      headers: { 'User-Agent': userAgent }
    });

    const loc2 = r2.headers.get('location');
    const cookies = r2.headers.get('set-cookie') || '';
    if (!loc2) {
      throw new Error('OneDrive download redirect failed');
    }

    // Step 3: Fetch final PDF stream with FedAuth cookie
    const finalUrl = loc2.startsWith('http') ? loc2 : `https://onedrive.live.com${loc2}`;
    const r3 = await fetch(finalUrl, {
      headers: {
        'User-Agent': userAgent,
        'Cookie': cookies
      }
    });

    if (!r3.ok) {
      throw new Error(`OneDrive stream HTTP ${r3.status}`);
    }

    const contentType = r3.headers.get('content-type') || 'application/pdf';
    const arrayBuf = await r3.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    let filename = 'Spatiocoretech_brochure.pdf';
    if (loc2.includes('.pdf')) {
      const match = loc2.match(/([a-zA-Z0-9_\-\.%]+\.pdf)/i);
      if (match && match[1]) {
        filename = decodeURIComponent(match[1]);
      }
    }

    return { buffer, contentType, filename };
  }

  // API Route: Stream PDF securely inside iframe without X-Frame-Options blocks
  app.get(['/api/pdf-stream', '/api/view-pdf', '/api/proxy-pdf'], async (req, res) => {
    try {
      const targetUrl = (req.query.url as string) || '';
      const isDownload = req.query.download === '1' || req.query.download === 'true';
      const cacheKey = targetUrl || 'default';

      // 1. In-memory cache hit (valid for 30 minutes)
      const cached = pdfCache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp < 1000 * 60 * 30)) {
        res.setHeader('Content-Type', cached.contentType);
        res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="${cached.filename}"`);
        res.setHeader('Cache-Control', 'public, max-age=1800');
        res.removeHeader('X-Frame-Options');
        return res.send(cached.buffer);
      }

      // 2. Direct local document check
      if (targetUrl.startsWith('/') || !targetUrl.startsWith('http')) {
        const relPath = targetUrl.startsWith('/') ? targetUrl : `/${targetUrl}`;
        const directPath = path.resolve(process.cwd(), `public${relPath}`);
        if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
          const buf = fs.readFileSync(directPath);
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="${path.basename(directPath)}"`);
          res.setHeader('Cache-Control', 'public, max-age=1800');
          res.removeHeader('X-Frame-Options');
          return res.send(buf);
        }
      }

      // 3. Local pre-cached PDF fallback check
      const localPdfPath = path.resolve(process.cwd(), 'public/documents/Brochure.pdf');
      const altPdfPath = path.resolve(process.cwd(), 'public/documents/spatiocoretech_brochure.pdf');

      // 4. Remote URLs
      if (!targetUrl || targetUrl.includes('1drv.ms') || targetUrl.includes('onedrive.live.com')) {
        const urlToFetch = targetUrl || 'https://1drv.ms/b/c/C68DB201D623F88B/IQBRR9VJ-TA-T6HnZCsDV_k5AT6_eq-DmGuFBNzVeVMGSq0?e=jRk9Cf';
        try {
          const result = await resolveOneDrivePdf(urlToFetch);
          pdfCache.set(cacheKey, { ...result, timestamp: Date.now() });

          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="${result.filename}"`);
          res.setHeader('Cache-Control', 'public, max-age=1800');
          res.removeHeader('X-Frame-Options');
          return res.send(result.buffer);
        } catch (fetchErr) {
          console.warn('[PDF Proxy] Live OneDrive fetch error, using local cached PDF:', fetchErr);
          const resolvedPdf = fs.existsSync(localPdfPath) ? localPdfPath : (fs.existsSync(altPdfPath) ? altPdfPath : null);
          if (resolvedPdf) {
            const buf = fs.readFileSync(resolvedPdf);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="Brochure.pdf"`);
            res.setHeader('Cache-Control', 'public, max-age=1800');
            res.removeHeader('X-Frame-Options');
            return res.send(buf);
          }
        }
      }

      // 4. Google Drive URLs
      if (targetUrl.includes('drive.google.com')) {
        let fileId = '';
        const m1 = targetUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (m1) fileId = m1[1];
        const m2 = targetUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (m2) fileId = m2[1];

        if (fileId) {
          try {
            const driveUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
            const gRes = await fetch(driveUrl);
            if (gRes.ok) {
              const buf = Buffer.from(await gRes.arrayBuffer());
              res.setHeader('Content-Type', 'application/pdf');
              res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="spatiocore_document.pdf"`);
              res.removeHeader('X-Frame-Options');
              return res.send(buf);
            }
          } catch (gErr) {
            console.warn('[PDF Proxy] Google Drive fetch failed:', gErr);
          }
        }
      }

      // 5. Final fallback to local cached copy
      if (fs.existsSync(localPdfPath)) {
        const buf = fs.readFileSync(localPdfPath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `${isDownload ? 'attachment' : 'inline'}; filename="Spatiocoretech_brochure.pdf"`);
        res.removeHeader('X-Frame-Options');
        return res.send(buf);
      }

      return res.redirect(targetUrl);
    } catch (err) {
      console.error('[PDF Proxy Route Error]', err);
      const localPdfPath = path.resolve(process.cwd(), 'public/documents/spatiocoretech_brochure.pdf');
      if (fs.existsSync(localPdfPath)) {
        const buf = fs.readFileSync(localPdfPath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="Spatiocoretech_brochure.pdf"');
        res.removeHeader('X-Frame-Options');
        return res.send(buf);
      }
      res.status(500).send('Unable to stream document');
    }
  });

  // Dynamic OpenGraph / Twitter Cards / Title injection for all public direct links
  function injectPublicPageMeta(rawHtml: string, reqUrl: string, host: string): string {
    try {
      const urlObj = new URL(reqUrl, `https://${host}`);
      const pathname = urlObj.pathname.toLowerCase();

      // 1. Identity Portal Public Direct URLs
      if (
        pathname === '/portal' || 
        pathname === '/identity' || 
        pathname === '/id-portal' || 
        pathname === '/client-portal' || 
        pathname === '/identity-portal' || 
        pathname.startsWith('/portal/') ||
        pathname === '/qr'
      ) {
        const title = 'Official Public Identity & Verification Portal | SpatioCore Tech';
        const description = 'Access official verified digital visiting cards, executive leadership credentials, corporate capabilities brochure, and company profile repository for SpatioCore Tech.';
        const fullUrl = `https://${host}${urlObj.pathname}`;
        return rawHtml
          .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
          .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${description}" />`)
          .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${title}" />`)
          .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${description}" />`)
          .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${fullUrl}" />`);
      }
      
      // 2. Brochures & Publications Public Direct URLs (with typo tolerance: brouchure, borcher)
      if (
        pathname.includes('brochure') || 
        pathname.includes('brouchure') || 
        pathname.includes('borcher') || 
        pathname.includes('borchure') || 
        pathname === '/catalog'
      ) {
        const title = 'Corporate Capabilities Brochure 2026 | SpatioCore Tech';
        const description = 'Official corporate capabilities brochure of SpatioCore Tech. Explore GIS, remote sensing, satellite data analytics, and geospatial intelligence solutions in wide spread format.';
        const fullUrl = `https://${host}${urlObj.pathname}`;
        return rawHtml
          .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
          .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${description}" />`)
          .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${title}" />`)
          .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${description}" />`)
          .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${fullUrl}" />`);
      }

      // 3. Profiles & Institutional Dossiers Public Direct URLs (with typo tolerance: porfile, porfiles)
      if (pathname.includes('profile') || pathname.includes('porfile')) {
        const title = 'Official Company Profile | SpatioCore Tech';
        const description = 'Verified comprehensive company profile of SpatioCore Tech. 16-page executive briefing on satellite data engineering, precision remote sensing, and enterprise geospatial intelligence.';
        const fullUrl = `https://${host}${urlObj.pathname}`;
        return rawHtml
          .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
          .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${description}" />`)
          .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${title}" />`)
          .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${description}" />`)
          .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${fullUrl}" />`);
      }

      // 4. Cards Collective Directory
      if (
        pathname === '/cards' || 
        pathname === '/business-cards' || 
        pathname === '/visiting-cards' || 
        pathname === '/vcards' || 
        pathname === '/visitingcards' || 
        pathname === '/business-card'
      ) {
        const title = 'Official Personnel & Executive Business Cards | SpatioCore Tech';
        const description = 'Verified digital visiting cards and leadership contact registry for SpatioCore Tech. Instant connection via WhatsApp, phone, and email.';
        const fullUrl = `https://${host}${urlObj.pathname}`;
        return rawHtml
          .replace(/<title>.*?<\/title>/i, `<title>${title}</title>`)
          .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${description}" />`)
          .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${title}" />`)
          .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${description}" />`)
          .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${fullUrl}" />`);
      }

      // 5. Individual Personnel Direct Visiting Cards
      let cardId = '';
      if (
        pathname.startsWith('/card/') || 
        pathname.startsWith('/cards/') || 
        pathname.startsWith('/visiting-card/') || 
        pathname.startsWith('/visitingcards/') || 
        pathname.startsWith('/vcard/')
      ) {
        cardId = pathname.split('/')[2] || '';
      } else if (pathname === '/card' || pathname === '/visiting-card' || pathname === '/vcard') {
        cardId = urlObj.searchParams.get('card') || urlObj.searchParams.get('id') || 'sidra-tul-muntaha';
      }

      if (cardId === 'ceo') cardId = 'sidra-tul-muntaha';
      if (cardId === 'coo') cardId = 'mehtab-ahmed';

      if (cardId) {
        const cardsJsonPath = path.resolve(process.cwd(), 'src/data/businessCards.json');
        if (fs.existsSync(cardsJsonPath)) {
          const cards = JSON.parse(fs.readFileSync(cardsJsonPath, 'utf-8'));
          const card = cards.find((c: any) => c.id === cardId) || cards[0];
          if (card) {
            const title = `${card.name} | ${card.title} – SpatioCore Tech`;
            const description = `Official verified digital visiting card for ${card.name}, ${card.title} at SpatioCore Tech. Connect via WhatsApp (${card.phone}) or Email (${card.email}). Where Earth Data Meets Smart Solutions.`;
            const fullUrl = `https://${host}${urlObj.pathname}`;
            const imageUrl = `https://${host}/images/og-visiting-card.svg`;

            let updated = rawHtml;
            updated = updated.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);
            updated = updated.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${description}" />`);
            updated = updated.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${title}" />`);
            updated = updated.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${description}" />`);
            updated = updated.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${fullUrl}" />`);
            updated = updated.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${imageUrl}" />`);
            updated = updated.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${title}" />`);
            updated = updated.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${description}" />`);
            updated = updated.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${imageUrl}" />`);
            return updated;
          }
        }
      }

      return rawHtml;
    } catch (e) {
      return rawHtml;
    }
  }

  // Enable Vite middleware in dev, serve static build in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // SPA support in development: fallback to index.html for navigation routes
    app.get('*', async (req, res, next) => {
      // Skip API routes or static files with extensions
      if (req.originalUrl.startsWith('/api') || req.originalUrl.includes('.')) {
        return next();
      }
      try {
        const indexHtmlPath = path.resolve(process.cwd(), 'index.html');
        let html = await fs.promises.readFile(indexHtmlPath, 'utf-8');
        // Apply Vite HTML transforms (injects HMR client, styles, etc.)
        html = await vite.transformIndexHtml(req.originalUrl, html);
        const host = req.get('host') || 'localhost:3000';
        html = injectPublicPageMeta(html, req.originalUrl, host);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', async (req, res) => {
      try {
        const indexHtmlPath = path.join(distPath, 'index.html');
        let html = await fs.promises.readFile(indexHtmlPath, 'utf-8');
        const host = req.get('host') || 'localhost:3000';
        html = injectPublicPageMeta(html, req.originalUrl, host);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Routing online at port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Init failed:', err);
  process.exit(1);
});
