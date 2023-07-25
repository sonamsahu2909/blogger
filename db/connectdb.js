const mongoose = require('mongoose') 

const url = "mongodb://127.0.0.1:27017/Blog_Project"
const live_URL = 'mongodb+srv://sonamsahu2909:sneha123@cluster0.cya5c5e.mongodb.net/BlogProject?retryWrites=true&w=majority'



const connectDB = ()=>{
    // return mongoose.connect(url)
    return mongoose.connect(live_URL)
    // return mongoose.connect(url)

    .then(()=>{
        console.log('database connected')

    })
    .catch((error)=>{
        console.log(error)
    })

}

module.exports = connectDB
