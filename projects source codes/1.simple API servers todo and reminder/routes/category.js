const router = require('express').Router();
const categoryController = require('../controller/categoryController');
const auth = require('../middleware/auth');
//get category
router.get('/', categoryController.getCategory);

// //add category
router.post('/',auth , categoryController.addCategory);

//update category
router.put('/:id', auth, categoryController.updateCategory)

// //delete category
router.delete('/:id', auth, categoryController.deleteCategory);



module.exports = router;