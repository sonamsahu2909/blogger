const BlogModel = require("../../models/Blog");
const bcrypt = require("bcrypt");
var cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "dxhsy70tz",
  api_key: "743486792624739",
  api_secret: "MjvRwDuDpBUH4X6CKUx0wMFLCuE",
  secure: true
});

class BlogController {
  static displayBlog = async (req, res) => {
    try {
      const data = await BlogModel.find();
      // console.log(data)
      res.render("admin/blog/display", { d:data, message: req.flash("success")});
    } catch (error) {
      console.log(error);
    }
  };

  static insertblog = async (req, res) => {
    try {
      //console.log(req.files.image)

      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImage",
      });

      // console.log(myimage)
      const result = new BlogModel({
        title: req.body.title,
        description: req.body.description,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });

      await result.save();
      // console.log(result)
      res.redirect("/admin/blog/display");
    } catch (error) {
      console.log(error);
    }
  };

  static blogview = async (req, res) => {
    try {
      const data = await BlogModel.findById(req.params.id);
      // console.log(data)
      res.render("admin/blog/view", { view: data });
    } catch (error) {
      console.log(error);
    }
  };

  static blogedit = async (req, res) => {
    try {
      const data = await BlogModel.findById(req.params.id);
      //   console.log(data)
      res.render("admin/blog/edit", { edit: data });
    } catch (error) {
      console.log(error);
    }
  };

  static blogupdate = async (req, res) => {
    try {
      // console.log(req.body)
      // console.log(req.params.id)

      //first delete the image
        const blog = await BlogModel.findById(req.params.id);
        const imageid = blog.image.public_id;
        // console.log(imageid)

        await cloudinary.uploader.destroy(imageid);

      //second upload image
      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "blogImage",
      });
      const update = await BlogModel.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });

      await update.save();
      res.redirect("/admin/blog/display");
    } catch (error) {
      console.log(error);
    }
  };

  static blogdelete = async (req, res) => {
    try {
      const blog = await BlogModel.findByIdAndDelete(req.params.id);
      const imageid = blog.image.public_id;
      // console.log(imageid)

      await cloudinary.uploader.destroy(imageid);
      // console.log(req.body)
      // console.log(req.params.id)
      await BlogModel.findByIdAndDelete(req.params.id);
        // console.log(data)
      req.flash("success", "Delete Successfully ");
      res.render("admin/blog/display");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = BlogController;
