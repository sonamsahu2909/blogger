const AboutModel = require("../../models/About");
const bcrypt = require("bcrypt");
var cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const AdminModel = require("../../models/Admin");

cloudinary.config({
  cloud_name: "dxhsy70tz",
  api_key: "743486792624739",
  api_secret: "MjvRwDuDpBUH4X6CKUx0wMFLCuE",
  secure: true,
});

class AboutController {
  static AboutDisplay = async (req, res) => {
    try {
      const data = await AboutModel.find();
      const {name,email,image,id} = await AdminModel.findOne()
      res.render("admin/about/display", { d: data, n:name , e:email, image:image });
    } catch (error) {
      console.log(error);
    }
  };

  static insertAbout = async (req, res) => {
    try {
      //console.log(req.files.image)

      const file = req.files.image;
      const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "aboutImage",
      });

      // console.log(myimage)
      const result = new AboutModel({
        description: req.body.description,
        image: {
          public_id: myimage.public_id,
          url: myimage.secure_url,
        },
      });

      await result.save();
    //   console.log(result)
      res.redirect("/admin/about/display");
    } catch (error) {
      console.log(error);
    }
  };

  //   static aboutview = async (req, res) => {
  //     try {
  //       const data = await AboutModel.findById(req.params.id);
  //       // console.log(data)
  //       res.render("admin/about/view", { view: data });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   static aboutedit = async (req, res) => {
  //     try {
  //       const data = await AboutModel.findById(req.params.id);
  //       //   console.log(data)
  //       res.render("admin/about/edit", { edit: data });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   static aboutupdate = async (req, res) => {
  //     try {
  //       // console.log(req.body)
  //       // console.log(req.params.id)

  //       //first delete the image
  //         const about = await AboutModel.findById(req.params.id);
  //         const imageid = about.image.public_id;
  //         // console.log(imageid)

  //         await cloudinary.uploader.destroy(imageid);

  //       //second upload image
  //       const file = req.files.image;
  //       const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
  //         folder: "aboutImage",
  //       });
  //       const update = await AboutModel.findByIdAndUpdate(req.params.id, {
  //         title: req.body.title,
  //         description: req.body.description,
  //         image: {
  //           public_id: myimage.public_id,
  //           url: myimage.secure_url,
  //         },
  //       });

  //       await update.save();
  //       res.redirect("/admin/about/display");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   static aboutdelete = async (req, res) => {
  //     try {
  //         const data = await AboutModel.findByIdAndDelete(req.params.id);
  //       // const imageid = about.image.public_id;
  //       //console.log(imageid)

  //       // await cloudinary.uploader.destroy(imageid);
  //       //console.log(req.body)
  //       //console.log(req.params.id)
  //       // await AboutModel.findByIdAndDelete(req.params.id);
  //       //   console.log(data)
  //     //   req.flash("success", "Delete Successfully ");
  //       res.render("admin/about/display",{c:data});
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
}

module.exports = AboutController;
