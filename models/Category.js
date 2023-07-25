const mongoose = require('mongoose')

// define schema
const CategorySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    
    image:{
        public_id:{
          type : String,
        },
        url:{
          type: String,
        }
      }
},{timestamps: true})

// create collection
// blog is the name of collection
// blogschema is the field of blog collection
const CategoryModel = mongoose.model('category',CategorySchema)

module.exports = CategoryModel