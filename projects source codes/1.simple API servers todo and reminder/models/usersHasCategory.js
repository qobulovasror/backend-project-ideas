const mongoose = require('mongoose');

const UsersHasCategorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        requried: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        requried: true
    },
});

const UsersHasCategory = mongoose.model('UsersHasCategory', UsersHasCategorySchema, 'usersHasCategory');

module.exports.UsersHasCategory = UsersHasCategory;