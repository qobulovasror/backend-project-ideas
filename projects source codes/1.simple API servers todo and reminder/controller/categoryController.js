const objectId = require('mongoose').Types.ObjectId;
const { Category, categoryValidate } = require("../models/category");
const { UsersHasCategory } = require("../models/usersHasCategory");

const getCategories = async (userId) =>{
    const usersHasCategory = await UsersHasCategory.find({userId: userId}).select({categoryId: 1, _id: 0});
    var categoryIds = usersHasCategory.map(category => category.categoryId);
    const categories = await Category.find({"_id" : { "$in" : categoryIds} });
    return categories;
} 
async function getCategory(req, res){
    try {
        const userId = req.body.userId;
        if(!userId) 
            return res.status(401).send('userId is required');
        if(!objectId.isValid(userId)) 
            return res.status(401).json({"error": "userId must be of type objectId"});
        const categories = await getCategories(userId)
        res.send(categories);
    } catch (error) {
        res.status(500).json({ error: `Ma'lumotni olishda xatolik ${error}`});
    }
}

async function addCategory(req, res){
    try{
        const {error} = categoryValidate(req.body);
        if(error)
            return res.status(401).send(error.details[0].message);
        if(!objectId.isValid(req.body.userId)) 
            return res.status(401).json({"error": "userId must be of type objectId"});
        let category = await Category.findOne({name: req.body.name});
        if(!category){
            category = new Category({
                name: req.body.name,
                icon: req.body.icon,
            });
            category = await category.save();
        }
        let usersHasCategory = await UsersHasCategory.findOne({userId: req.body.userId, categoryId: category._id});
        if(!usersHasCategory){
            usersHasCategory = new UsersHasCategory({
                userId: req.body.userId,
                categoryId: category._id
            });
            await usersHasCategory.save()
        }
        res.send(category)
    } catch (error) {
        res.status(500).json({ error: `Ma'lumotni olishda xatolik ${error}`});
    }
}


async function updateCategory(req, res){
    try{
        if(!objectId.isValid(req.params.id)) 
            return res.status(401).json({"error": "id objectId turida bo'lishi kerak"});
        let category = await Category.findById(req.params.id);
        if(!category)
            return res.status(404).send('Berilgan id\'li category yo\'q')
        const {error} = categoryValidate(req.body);
        if(error)
            return res.status(401).send(error.details[0].message);
        //get req.user id no equel in db userId
        let usersHasCategory = await UsersHasCategory
            .find({categoryId: category._id, userId: {$ne: req.body.userId}});
        console.log(usersHasCategory)
        if(usersHasCategory.length!==0){
            return res.status(400).send("Berilga id'li category o'zgartirib bo'lmaydi")
        }
        category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            icon: req.body.icon
        }) 
        res.send(category._id)
    } catch (error) {
        res.status(500).json({ error: `Ma'lumotni olishda xatolik ${error}`});
    }
}

async function deleteCategory(req, res){
    try{
        if(!objectId.isValid(req.params.id)) 
            return res.status(401).json({"error": "id objectId turida bo'lishi kerak"});
        let category = await Category.findById(req.params.id)
        if(!category)
            return res.status(404).send("Berilgan id'li category yo'q")
        let usersHasCategory = await UsersHasCategory
            .find({categoryId: category._id, userId: {$ne: req.body.userId}});
        if(usersHasCategory){
            usersHasCategory = await UsersHasCategory
                .deleteOne({categoryId: category._id, userId: req.body.userId})
        }else{
            usersHasCategory = await UsersHasCategory
                .deleteOne({categoryId: category._id, userId: req.body.userId});
            category = await Category.findByIdAndDelete(req.params.id)
        }
        res.send(category)
    }catch(error){
        res.status(500).json({ error: `Ma'lumotni olishda xatolik ${error}`});
    }
}

module.exports = {
    getCategory,
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
}