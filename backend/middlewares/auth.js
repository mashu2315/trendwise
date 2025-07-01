const { getAuth } = require('firebase-admin/auth');
const admin = require('firebase-admin');
require('dotenv').config();
 const jwt = require('jsonwebtoken');

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


exports.verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || typeof token !== 'string') {
    return res.status(401).json({ error: 'Unauthorized: No token provided or invalid token format' });
  }

  try {
    const decoded = await getAuth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};


