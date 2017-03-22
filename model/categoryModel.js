var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({
    categoryname : {type : String, require: true}

});

var categories = module.exports = mongoose.model('categories',categorySchema);

module.exports.addCat = function(newCat,callback){
    newCat.save(callback);
}

module.exports.getCategory = function(callback){
    categories.find({},callback);
}

module.exports.delete = function(id,callback){
    categories.remove({_id : id},callback);
}