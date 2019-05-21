const express = require('express');
const router = express.Router();

const Controller = require('../controllers/teacherManageController')

router.route('/').get(Controller.index)
router.route('/post').post(Controller.post)
router.route('/update').post(Controller.update)
router.route('/delete/:id').get(Controller.delete)
router.route('/info/:id').get(Controller.info)
router.get('/showExaminationList/:teacherId', (req,res) => {
    require('../models/modelTeacher').findById(req.params.teacherId , (err , teacher) => {
        res.render('pages/showExaminationForTeacher' , {teacher:teacher})
    }).populate({path: "examination" ,  populate : [{path:"course" , populate : {path : "sub_id"}} , {path:'room'}] })
})

router.get('/showCourse/:teacherId' , (req,res) => {
    require('../models/modelTeacher').findById(req.params.teacherId , (err , teacher) => {
        res.render('pages/showCourseForTeacher', {teacher , teacher})
    }).populate({path : 'course' , populate : {path : 'sub_id'}})
})
module.exports = router