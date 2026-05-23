const express = require('express');
const router = express.Router();
const { register, login, getMe, upgradePlan, saveSubscription, getVapidPublicKey, getMyTransactions, changePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/upgrade', protect, upgradePlan);
router.post('/subscribe', protect, saveSubscription);
router.get('/vapid-public-key', protect, getVapidPublicKey);
router.get('/transactions', protect, getMyTransactions);
router.put('/change-password', protect, changePassword);

module.exports = router;
