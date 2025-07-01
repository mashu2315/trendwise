const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.getAllArticles);
router.get('/:slug', articleController.getArticleBySlug);
router.post('/', articleController.createArticle);

module.exports = router;