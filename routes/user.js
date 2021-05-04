const router = require('express').Router();

const {getCurrentUser, updateUser} = require('../controllers/user');
const {userDataValidator} = require('../validators/user');

router.get('/me', getCurrentUser);
router.patch('/me', userDataValidator, updateUser);

module.exports = router;
