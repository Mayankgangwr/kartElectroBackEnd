const express = require("express");
const router = express.Router();
const loginLimiter =  require('../Middleware/loginLimiter');
const authController = require('../controllers/authController');



router.route('/').post(loginLimiter, authController.login)
router.route('/refresh').get(authController.refresh)
router.route('/logout').get(authController.logout)

module.exports = router;
