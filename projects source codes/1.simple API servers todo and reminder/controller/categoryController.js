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
        res.status(500).json({ error: `Failed to fetch data ${error}`});
    }
}

async function addCategory(req, res){
    try{
        const {error} = categoryValidate(req.body);
        if(error)
            return res.status(401).send(error.details[0].message);
        if(!objectId.isValid(req.body.userId)) 
            return res.status(401).json({"error": "userId must be of type objectId"});
        let category = await Category.find({name: req.body.name});
        if(!category){
            category = new Category({
                name: req.body.name,
                icon: req.body.icon,
            });
            category = await category.save();
        }
        const usersHasCategory = new UsersHasCategory({
            userId: req.body.userId,
            categoryId: category._id
        });
        await usersHasCategory.save()
        res.send(category)
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch data ${error}`});
    }
}

module.exports = {
    getCategory,
    getCategories,
    addCategory
}