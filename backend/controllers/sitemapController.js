const Article = require('../models/Article');

exports.getSitemap = async (req, res) => {
  try {
    const articles = await Article.find({}, 'slug createdAt');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${articles.map(a => `
    <url>
      <loc>${process.env.FRONTEND_URL}/article/${a.slug}</loc>
      <lastmod>${a.createdAt.toISOString()}</lastmod>
    </url>`).join('')}
</urlset>`;
    res.type('application/xml').send(xml);
  } catch (error) {
    res.status(500).send('Server error');
  }
};