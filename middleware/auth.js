const jwt = require('jsonwebtoken')
const AdminModal = require('../models/Admin')
const { json } = require('express')

const checkadminauth = async(req,res,next)=>{

    // console.log('hello auth')
    const {token} = req.cookies
    // console.log(token)
    if (!token){
        req.flash('error', 'unauthrized Admin') 
        res.redirect('/login')
    }
    else{
        const verify = jwt.verify(token,'sonamsahu@123456789')
        // console.log(verify)
        const admin =await AdminModal.findById({_id:verify.id})
        // console.log(admin)
        req.Admin = admin
        next()
    }

}
module.exports = checkadminauth