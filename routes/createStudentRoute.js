const router=require('express').Router()
const { Router } = require('express')
const {getDemoClassNumber,getDemoApp,createStudent}=require('../controllers/createStudentController')


router.route('/').post(getDemoClassNumber,getDemoApp,createStudent)



module.exports=router