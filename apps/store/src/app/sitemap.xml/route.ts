import { NextResponse } from 'next/server';

export async function GET() {
    const pages = ['/', '/books'];

    const body = `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
        .map(
            page => `
      <url>
        <loc>https://bookme.kyiv.ua${page}</loc>
        <priority>0.8</priority>
      </url>`
        )
        .join('')}
  </urlset>`;

    return new NextResponse(body, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
