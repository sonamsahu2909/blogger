const islogin = async(req,res,next)=>{
    // console.log('hello auth')
    const {token} = req.cookies
    // console.log(token)
    if (token){
        res.redirect('/admin/dashbord')
    }
    next()

}

module.exports = islogin