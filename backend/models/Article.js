
const mongoose = require('mongoose');

const metaSchema = new mongoose.Schema({
  description: String,
  ogTitle: String,
  ogImage: String,
}, { _id: false });

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  meta: metaSchema,
  media: [String], 
  content: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Article', articleSchema);
