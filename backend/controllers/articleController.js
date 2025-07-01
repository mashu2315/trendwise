const Article = require('../models/Article');
const { crawlTrends } = require('../utils/crawler');
const { generateArticle } = require('../utils/openai');

exports.getAllArticles = async (req, res) => {
  try {
    const { q } = req.query;

    // If search query exists
    if (q) {
      const regex = new RegExp(q, 'i'); // case-insensitive search
      let articles = await Article.find({ title: regex });

      // If no results, use Gemini to generate
      if (!articles.length) {
        const articleData = await generateArticle({ title: q });

        const sanitizedSlug = articleData.title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');

        const newArticle = new Article({
          title: articleData.title,
          slug: sanitizedSlug,
          meta: articleData.meta,
          media: articleData.media,
          content: articleData.content,
        });

        await newArticle.save();

        // Respond with the new article
        return res.json([newArticle]);
      }

      return res.json(articles); // Found from DB
    }

    // Default: return all
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    console.error('Error in getAllArticles:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    console.log("Article slug is:", article)
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Server error occured in getting article by slug' });
  }
};


exports.createArticle = async (req, res) => {
  try {
    const trends = await crawlTrends();
    const articleData = await generateArticle(trends[0]); // Example: Use first trend
    const sanitizedSlug = articleData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters like :, '
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Remove duplicate hyphens
    const article = new Article({
      title: articleData.title,
      slug: sanitizedSlug,
      meta: articleData.meta,
      media: articleData.media,
      content: articleData.content,
    });
    await article.save();
    res.json(article);
  } catch (error) {
    console.error('Error in createArticle:', error);
    res.status(500).json({ error: 'Failed to generate article', details: error.message });
  }
};



