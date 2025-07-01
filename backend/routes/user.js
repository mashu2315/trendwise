
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.saveUser);
router.get('/:uid', userController.getUser);

module.exports = router;




