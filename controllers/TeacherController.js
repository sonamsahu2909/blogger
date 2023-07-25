class TeacherController{
    
    static display = (req,res)=>{
        res.render('teacher/display')
    }

    static create = (req,res)=>{
        res.render('teacher/create')
    }

    static insert = (req,res)=>{
        res.render('teacher/insert')
    }
}

module.exports = TeacherController