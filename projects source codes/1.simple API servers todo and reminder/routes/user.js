const router = require('express').Router();
const userController = require('../controller/userController');

// get all users
router.get('/', userController.getAllUsers);

//get user with id
router.get('/:id', userController.getUser);

// add user
router.post('/', userController.postUser);

//update user
router.put('/:id', userController.postUser);

//delete user
router.delete('/:id', userController.postUser);

module.exports = router;