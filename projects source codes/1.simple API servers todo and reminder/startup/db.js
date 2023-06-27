const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect("mongodb://127.0.0.1/todo")
        .then(()=>{
            console.log('DB connection is succsess');
        })
        .catch(err=>{
            console.log(`db connection error: ${err}`);
        });
}