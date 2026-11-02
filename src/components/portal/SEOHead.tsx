/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { OFFICIAL_PDF_CATALOG } from '../../data/portalData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonicalPath?: string;
  noIndex?: boolean;
}

export default function SEOHead({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  canonicalPath = '/',
  noIndex = true
}: SEOHeadProps) {
  const defaultLander = OFFICIAL_PDF_CATALOG.landerConfiguration.defaultPage;
  const defaultMeta = defaultLander.metaTags;

  const resolvedTitle = title || defaultMeta.title;
  const resolvedDesc = description || defaultMeta.description;
  const resolvedOgTitle = ogTitle || defaultMeta.ogTitle;
  const resolvedOgDesc = ogDescription || defaultMeta.ogDescription;
  const resolvedOgImage = ogImage || defaultMeta.ogImage;
  const isNoIndex = noIndex !== undefined ? noIndex : defaultLander.unindexed;

  // Resolve absolute origin
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://www.spatiocore.com';
  const fullCanonicalUrl = `${siteUrl}${canonicalPath}`;
  const fullOgImage = resolvedOgImage.startsWith('http') ? resolvedOgImage : `${siteUrl}${resolvedOgImage}`;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      {isNoIndex && <meta name="robots" content="noindex, nofollow" />}
      {isNoIndex && <meta name="googlebot" content="noindex, nofollow" />}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph Meta Tags (Managed by JSON) */}
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDesc} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="SpatioCore Tech" />

      {/* Twitter Cards (Managed by JSON) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDesc} />
      <meta name="twitter:image" content={fullOgImage} />
    </Helmet>
  );
}
