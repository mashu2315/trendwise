
const Comment = require('../models/Comment');
const User = require('../models/User');
const admin = require('firebase-admin');

exports.createComment = async (req, res) => {
  try {
     if (!req.body) {
      return res.status(400).json({ error: 'Missing request body' });
    }
    const { articleId, content } = req.body;
   const authHeader = req.headers.authorization;
let token = req.headers.authorization;
if (token && token.startsWith('Bearer ')) {
  token = token.split(' ')[1];
}

if (!token) {
  return res.status(401).json({ error: 'No token provided' });
}


    const decodedToken = await admin.auth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const user = await User.findOne({ uid: userId });
    console.log("User of comment",user)
    if (!user) return res.status(404).json({ error: 'User not found' });

    const comment = new Comment({
      articleId,
      userId,
      content,
    });
    await comment.save();
    res.status(201).json({ ...comment._doc, user: { displayName: user.displayName } });
  } catch (error) {
    console.error('Error in createComment:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getCommentsByArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const comments = await Comment.find({ articleId }).sort({ createdAt: -1 });
    const commentsWithUser = await Promise.all(
      comments.map(async (comment) => {
        const user = await User.findOne({ uid: comment.userId });
        return { ...comment._doc, user: { displayName: user?.displayName || 'Anonymous' } };
      })
    );
    res.json(commentsWithUser);
  } catch (error) {
    console.error('Error in getCommentsByArticle:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};