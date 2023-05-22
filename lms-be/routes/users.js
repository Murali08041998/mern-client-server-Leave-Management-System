var express = require('express');
var router = express.Router();
const UserController = require('../controllers/users')
const auth = require('../common/auth')

router.post('/signup',UserController.handleSignup)

router.post('/login',UserController.handleLogin)

router.get('/details/:id',auth.validate,UserController.handleGetUserDetails)

module.exports = router;