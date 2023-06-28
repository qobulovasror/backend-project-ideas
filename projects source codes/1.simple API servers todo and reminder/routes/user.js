const router = require('express').Router();
const userController = require('../controller/userController');

// get all users
router.get('/', userController.getAllUsers);

//get user with id
router.get('/:id', userController.getUser);

// add user
router.post('/', userController.postUser);

//update user
router.put('/:id', userController.putUser);

//delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;