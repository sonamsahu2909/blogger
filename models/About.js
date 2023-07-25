const mongoose = require("mongoose");

// define schema
const AboutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// create collection
// blog is the name of collection
// blogschema is the field of blog collection
const AboutModel = mongoose.model("about", AboutSchema);

module.exports = AboutModel;
