const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
  name:{ type: String, required:true},
  description:{ type: String, required:true},
  age:{ type: Number, required:true},
  imagePath:{type: String, required:true}
})

module.exports = mongoose.model('Form', formSchema);
