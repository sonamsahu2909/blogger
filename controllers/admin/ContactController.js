const AdminModel = require("../../models/Admin");
const ContactModel = require("../../models/Contact");
const { display } = require("../TeacherController");

class ContactController{

    static displayContact = async (req,res)=>{
        try{
            const display = await ContactModel.find()
            const {name,email,image,id} = await AdminModel.findOne()
            res.render('admin/contact/display',{d:display, n:name , e:email, image:image})
        }
        catch(error){
            console.log(error)
        }
        
    }

    static contactInsert = async (req, res) => {
        try {
        //  console.log(req.body)
          const insert = new ContactModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
            contact_id:req.body.id
            });
    
          await insert.save();
          // console.log(insert)
          res.redirect("admin/contact/display");
        } catch (error) {
          console.log(error);
        }
      };
    
     
     
}

module.exports = ContactController