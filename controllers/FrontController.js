const AdminModel = require("../models/Admin");
const BlogModel = require("../models/Blog");
const bcrypt = require('bcrypt');
const CategoryModel = require("../models/Category");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: "dxhsy70tz",
  api_key: "743486792624739",
  api_secret: "MjvRwDuDpBUH4X6CKUx0wMFLCuE",
});

class FrontController {
  static home = async (req, res) => {
    try{
      const { name, email, id, image } = await AdminModel.find()
      const blogs = await BlogModel.find().sort({_id:-1}).limit(6)
      //console.log(blogs)
      res.render('home',{b:blogs,n: name,e:email,image: image,})
     }
     catch(error){
      console.log(error)
     }
  };

  static about = (req, res) => {
    res.render("about");
  };
  
  static contact = async (req, res) => {
    try{
      const { name, email, id, image } = await AdminModel.find()
      res.render("contact",{n:name, e:email, image:image});
    }
    catch(error){
      console.log(error)
    }
  
  };

  static blog = async (req, res) => {
    try {
      const blogs = await BlogModel.find().sort({_id:-1})
      const { name, email, id, image } = await AdminModel.find()
      res.render("blog",{ b:blogs,n:name, e:email, image:image});
    } catch (error) {
      console.log(error);
    }
  };

  static signup = async (req,res)=>{

    try{
         res.render('signup',{error: req.flash('error')})

    } catch(error){
        console.log(error)
    }
   
}

  static login = async (req, res) => {
    try {
      const { name, email, id, image } = await AdminModel.find()
      res.render("login", {
        message: req.flash("success"),
        error: req.flash("error"),n:name , image:image ,e:email
      });
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  
  
  static readmore = async(req,res)=>{
    try{
     const detail = await BlogModel.findById(req.params.id)
     const recentblog = await BlogModel.find().limit(6)
     const recentcategorydetail = await CategoryModel.findById(req.params.id)
     const recentcategory = await CategoryModel.find().limit(6)
     res.render('read more',{d:detail, r:recentblog,cd:recentcategorydetail,rcat:recentcategory})

    }
    catch(error){
       console.log(error)
    }
 }

 static profile = async (req, res) => {
  try {
    const { name, email, id, image } = req.Admin;
    res.render("profile", {
      n: name,
      e: email,
      image: image,
      message: req.flash("success"),
      error: req.flash("error"),
    });
  } catch (error) {
    console.log(error);
  }
};
static change_password = async (req, res) => {
  try {
    const { name, email, id, image } = req.Admin;
    // console.log(req.body)
    const { oldpassword, newpassword, cpassword } = req.body;
    if (oldpassword && newpassword && cpassword) {
      const Admin = await AdminModel.findById(id);
      const ismatch = await bcrypt.compare(oldpassword, Admin.password);
      if (!ismatch) {
        req.flash("error", "old password is incorrect.");
        res.redirect("/profile"); //path is given
      } else {
        if (newpassword !== cpassword) {
          req.flash("error", "password does not match.");
          res.redirect("/profile"); //path is given
        } else {
          const newHashpassword = await bcrypt.hash(newpassword, 10);
          await AdminModel.findByIdAndUpdate(id, {
            $set: { password: newHashpassword },
          });
          req.flash("message", "password change successfully.");
          res.redirect("/logout"); //path is given
        }
      }
    } else {
      req.flash("error", "All field are required.");
      res.redirect("/profile"); //path is given
    }
  } catch (error) {
    console.log(error);
  }
};

static profile_update = async (req, res) => {
  try {
    //console.log(req.files.image)
    if (req.files) {
      const Admin = await AdminModel.findById(req.Admin.id);
      const image_id = Admin.image.public_id;
      await cloudinary.uploader.destroy(image_id);

      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "studentimage",
      });
      var data = {
        name: req.body.name,
        email: req.body.email,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      };
    } else {
      var data = {
        name: req.body.name,
        email: req.body.email,
      };
    }
    const update_profile = await AdminModel.findByIdAndUpdate(req.Admin.id,data);
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};
}

module.exports = FrontController;
