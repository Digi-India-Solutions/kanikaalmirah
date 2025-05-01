import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { finished } from 'stream/promises'; // This is needed for ESM stream handling

const sitemap = new SitemapStream({ hostname: 'https://swhealthcares.com/' });
const outputPath = resolve('./public/sitemap.xml');
const writeStream = createWriteStream(outputPath);

const links = [
  { url: '/', changefreq: 'monthly', priority: 1.0 },
  { url: '/all-products', changefreq: 'weekly', priority: 0.9 },
  { url: '/contact-us', changefreq: 'monthly', priority: 0.8 },
  { url: '/event', changefreq: 'monthly', priority: 0.7 },
  { url: '/about-us', changefreq: 'monthly', priority: 0.8 }
];

sitemap.pipe(writeStream);

for (const link of links) {
  sitemap.write(link);
}
sitemap.end();

// Wait for stream to finish
await finished(writeStream);

console.log('✅ Sitemap successfully generated at ./public/sitemap.xml');
