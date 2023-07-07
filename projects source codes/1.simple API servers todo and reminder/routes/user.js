const router = require('express').Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');
const { user, admin } = require('../middleware/role');

// get all users
router.get('/', auth, userController.getAllUsers);

//get user with id
router.get('/:id', auth, userController.getUser);

// add user
router.post('/', userController.postUser);

//update user
router.put('/:id', auth, userController.putUser);

//delete user
router.delete('/:id', auth, admin, userController.deleteUser);

module.exports = router;