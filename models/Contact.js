const mongoose = require("mongoose");

// define schema
const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image:    
    {
      public_id: {
        type: String,
        
      },
      url: {
        type: String,
         
      },
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create collection
// blog is the name of collection
// blogschema is the field of blog collection
const ContactModel = mongoose.model("contact", ContactSchema);

module.exports = ContactModel;
