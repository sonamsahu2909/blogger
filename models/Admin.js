const mongoose = require('mongoose');

const Adminschema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    image:    
    {
      public_id: {
        type: String,
        
      },
      url: {
        type: String,
         
      },
    }
},{timeseries:true})


const AdminModel = mongoose.model('admin',Adminschema)

module.exports = AdminModel