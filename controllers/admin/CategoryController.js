const CategoryModel = require("../../models/Category");
const bcrypt = require("bcrypt");
var cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const AdminModel = require("../../models/Admin");

cloudinary.config({
  cloud_name: "dxhsy70tz",
  api_key: "743486792624739",
  api_secret: "MjvRwDuDpBUH4X6CKUx0wMFLCuE",
  secure: true
});

class CategoryController{

    static categoryDisplay = async (req,res)=>{
        try{
            const data = await CategoryModel.find();
            const {name,email,image,id} = await AdminModel.findOne()
            res.render('admin/category/display',{c:data, n:name , e:email, image:image})
        }
        catch (error){
            console.log(error)
        }
    }

    static insertCategory = async (req, res) => {
        try {
          //console.log(req.files.image)
    
          const file = req.files.image;
          const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "categoryImage",
          });
    
          // console.log(myimage)
          const result = new CategoryModel({
            title: req.body.title,
            description: req.body.description,
            author: req.body.author,
            image: {
              public_id: myimage.public_id,
              url: myimage.secure_url,
            },
          });
    
          await result.save();
          // console.log(result)
          res.redirect("admin/category/display");
        } catch (error) {
          console.log(error);
        }
      };
    
      static categoryview = async (req, res) => {
        try {
          const data = await CategoryModel.findById(req.params.id);
          // console.log(data)
          res.render("admin/category/view", { view: data });
        } catch (error) {
          console.log(error);
        }
      };
    
      static categoryedit = async (req, res) => {
        try {
          const data = await CategoryModel.findById(req.params.id);
          //   console.log(data)
          res.render("admin/category/edit", { edit: data });
        } catch (error) {
          console.log(error);
        }
      };
    
      static categoryupdate = async (req, res) => {
        try {
          // console.log(req.body)
          // console.log(req.params.id)
    
          //first delete the image
            const category = await CategoryModel.findById(req.params.id);
            const imageid = category.image.public_id;
            // console.log(imageid)
    
            await cloudinary.uploader.destroy(imageid);
    
          //second upload image
          const file = req.files.image;
          const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "categoryImage",
          });
          const update = await CategoryModel.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            image: {
              public_id: myimage.public_id,
              url: myimage.secure_url,
            },
          });
    
          await update.save();
          res.redirect("/admin/category/display");
        } catch (error) {
          console.log(error);
        }
      };
    
      static categorydelete = async (req, res) => {
        try {
            const data = await CategoryModel.findByIdAndDelete(req.params.id);
          // const imageid = category.image.public_id;
          //console.log(imageid)
    
          // await cloudinary.uploader.destroy(imageid);
          //console.log(req.body)
          //console.log(req.params.id)
          // await categoryModel.findByIdAndDelete(req.params.id);
          //   console.log(data)
        //   req.flash("success", "Delete Successfully ");
          res.render("admin/category/display",{c:data});
        } catch (error) {
          console.log(error);
        }
      };
}

module.exports = CategoryController