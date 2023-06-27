const objectId = require('mongoose').Types.ObjectId;
const { Category, categoryValidate } = require("../models/category");
const { UsersHasCategory } = require("../models/usersHasCategory");


async function getCategory(req, res){
    try {
        const userId = req.body.userId;
        if(!userId) 
            return res.status(401).send('userId is required');

        if(!objectId.isValid(userId)) 
            return res.status(401).json({"error": "userId must be of type objectId"});
        const categoryIds = await UsersHasCategory.find({userId: userId});
        const categories = Category.find({"_id" : { "$in" : categoryIds} });
        res.send(categories);
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch data ${error}`});
    }
}

module.exports = {
    getCategory
}