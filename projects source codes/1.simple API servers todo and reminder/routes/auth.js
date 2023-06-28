const router = require('express').Router(); 
const authContrller = require('../controller/authController');

router.post('/', authContrller.postUser);

module.exports = router;