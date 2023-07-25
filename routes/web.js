const express = require('express')
const FrontController = require('../controllers/FrontController')
const TeacherController = require('../controllers/TeacherController')
const AdminController = require('../controllers/admin/AdminController')
const BlogController = require('../controllers/admin/BlogController')
const CategoryController = require('../controllers/admin/CategoryController')
const ContactController = require('../controllers/admin/ContactController')
const AboutController = require('../controllers/admin/AboutController')
const router = express.Router()
const checkadminauth = require('../middleware/auth')
const islogin = require('../middleware/islogin')

// Front route

router.get('/',FrontController.home)
router.get('/about',FrontController.about)
router.get('/contact',FrontController.contact)
router.get('/login',FrontController.login)
router.get('/blog',FrontController.blog)
router.get('/signup',FrontController.signup)
router.get('/readmore/:id',FrontController.readmore)
router.get('/logout',FrontController.logout)
router.get('/profile',checkadminauth,FrontController.profile)
router.post('/change_password',checkadminauth,FrontController.change_password)
router.post('/profile_update',checkadminauth,FrontController.profile_update)

// Teacher route
router.get('/teacher/display',checkadminauth,TeacherController.display)
router.get('/teacher/create',checkadminauth,TeacherController.create)
router.get('/teacher/insert',checkadminauth,TeacherController.insert)

// Admin route
router.get('/admin/dashbord',checkadminauth,AdminController.dashbord)
router.post('/verify_login',AdminController.verify_login)
router.post('/insert',AdminController.insert)

// Blog controlller
router.get('/admin/blog/display',BlogController.displayBlog)
router.post('/insertblog',BlogController.insertblog)
router.get('/blogview/:id',BlogController.blogview)
router.get('/blogedit/:id',BlogController.blogedit)
router.post('/blogupdate/:id',BlogController.blogupdate)
router.get('/blogdelete/:id',BlogController.blogdelete)

// category controlller
router.get('/admin/category/display',CategoryController.categoryDisplay)
router.post('/insertCategory',CategoryController.insertCategory)
router.get('/categoryview/:id',CategoryController.categoryview)
router.get('/categoryedit/:id',CategoryController.categoryedit)
router.post('/categoryupdate/:id',CategoryController.categoryupdate)
router.get('/categorydelete/:id',CategoryController.categorydelete)

// contact controller
router.get('/admin/contact/display',ContactController.displayContact)
router.post('/contactInsert',ContactController.contactInsert)

// about controller
router.get('/admin/about/display',AboutController.AboutDisplay)
router.post('/insertAbout',AboutController.insertAbout)
// router.get('/aboutview/:id',checkadminauth,AboutController.aboutview)
// router.get('/aboutedit/:id',checkadminauth,AboutController.aboutedit)
// router.post('/aboutupdate/:id',checkadminauth,AboutController.aboutupdate)
// router.get('/aboutdelete/:id',checkadminauth,AboutController.aboutdelete)
module.exports=router