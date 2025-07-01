const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { verifyToken } = require('../middlewares/auth');

router.post('/', verifyToken, commentController.createComment);
router.get('/:articleId', commentController.getCommentsByArticle);

module.exports = router;



