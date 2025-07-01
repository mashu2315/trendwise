
const User = require('../models/User');
const admin = require('firebase-admin');

exports.saveUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'No token provided' });
    console.log("Token le lo",token)
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;
    
    let user = await User.findOne({ uid });
    
    if (!user) {
      user = new User({
        uid,
        email,
        name: name || '',
        picture: picture || '',
      });
      await user.save();
    } else {
      user.email = email;
      user.displayName = name || user.displayName;
      user.photoURL = picture || user.photoURL;
      user.updatedAt = Date.now();
      await user.save();
    }
    console.log("User",user);
    res.json({ message: 'User saved successfully', user });
  } catch (error) {
    console.error('Error in saveUser:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error in getUser:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};