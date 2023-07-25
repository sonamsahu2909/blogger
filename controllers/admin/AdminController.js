const AdminModel = require('../../models/Admin')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: "dxhsy70tz",
  api_key: "743486792624739",
  api_secret: "MjvRwDuDpBUH4X6CKUx0wMFLCuE",
});

class AdminController{
    
    static dashbord = async (req,res)=>{
        try {
           const {name,email,image,id} = req.Admin
           res.render("admin/dashbord",{n:name,e:email,image:image})
  
        }catch (error) {
          console.log(error);
        }    
      }   
      
      static insert = async (req, res) => {
        // console.log(req.files.image)
        const file = req.files.image;
        const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "blogImage",
        });
        // console.log(imageUpload)
        const { name, email, password, cpassword } = req.body;
        const admin = await AdminModel.findOne({ email: email });
        //  console.log(admin)
        if (admin) {
          req.flash("error", "Email already exist");
          res.redirect("/signup"); //path is given
        } else {
          if (name && email && password && cpassword) {
            if (password == cpassword) {
              try {
                const hashpassword = await bcrypt.hash(password, 10);
                const result = new AdminModel({
                  name: name,
                  email: email,
                  password: hashpassword,
                  image: {
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url,
                  },
                });
                await result.save();
                req.flash(
                  "success",
                  "Registration Successfully please login here "
                );
                res.redirect("/login"); //path is given
              } catch (error) {
                console.log(error);
              }
            } else {
              req.flash("error", "password and confirm password does not match.");
              res.redirect("/signup"); //path is given
            }
          } else {
            req.flash("error", "All field are required.");
            res.redirect("/signup"); //path is given
          }
        }
      };

      static verify_login = async (req, res) => {
        try {
          // console.log(req.body)
          const { email, password } = req.body;
          if (email && password) {
            const admin = await AdminModel.findOne({ email: email });
            // console.log(admin)
            if (admin != null) {
              const ismatch = await bcrypt.compare(password, admin.password);
              if (ismatch) {
                  // generate token
                const token = jwt.sign({ id: admin._id }, "sonamsahu@123456789");
                 // console.log(token)
                 res.cookie("token", token);
                // multiple login
                res.redirect("admin/dashbord");

              } else {
                req.flash("error", "email or password is not valid");
                res.redirect("/login"); //path is given
              }
            } else {
              req.flash("error", "you are not register in email.");
              res.redirect("/login"); //path is given
            }
          } else {
            req.flash("error", "All field are required.");
            res.redirect("/login"); //path is given
          }
        } catch (error) {
          console.log(error);
        }
      };

      
    
}

module.exports = AdminController