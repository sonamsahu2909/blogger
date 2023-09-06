const AdminModel = require("../../models/Admin");
const ContactModel = require("../../models/Contact");
// const { display } = require("../TeacherController");

class ContactController{

    static displayContact = async (req,res)=>{
        try{
            const contact = await ContactModel.find().sort({_id:-1})
            // const {name,email,image,id} = await AdminModel.findOne()
            res.render('admin/contact/display',{d:contact})
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
          res.render("contact");
        } catch (error) {
          console.log(error);
        }
      };
    
     
     
}

module.exports = ContactController