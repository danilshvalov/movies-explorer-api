const router = require('express').Router();

const {login, logout, createUser} = require('../controllers/user');
const {signupValidator, signinValidator} = require('../validators/auth');

router.post('/signup', signupValidator, createUser);
router.post('/signin', signinValidator, login);
router.post('/signout', logout);

module.exports = router;
