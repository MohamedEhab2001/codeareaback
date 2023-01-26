
const sequalize = require ("../database/connect")
const {models} =sequalize
const getDemoClassNumber=async(req,res,next)=>{
    const  {class_number}=req.body
    const demoClass = await models.demoClass.findOne({
        where:{
            number:class_number
        }
    })
req.demoClass=demoClass
next()
}

const getDemoApp=async (req,res,next)=>{
    const demoAPP= await models.demoApp.findOne({
        where:{
            id:req.demoClass.demo_app_id
        
        }
    })

    req.demoAPP=demoAPP
next()
}

const createStudent=async (req,res,next)=>{

    console.log(req.demoAPP);
const student =await models.student.create({
    name: req.demoAPP.st_name,
    email:req.demoAPP.parent_email,
    parent_name:req.demoAPP.parent_name,
    parent_email:req.demoAPP.parent_email,
    parent_phone:req.demoAPP.parent_phone,
    gender: req.demoAPP.st_gender,
    birthday:"0",
    teacher_id:req.demoClass.teacher_id,
    password:'00000'

})

res.status(200).json(student)

}


module.exports={getDemoClassNumber,getDemoApp,createStudent}