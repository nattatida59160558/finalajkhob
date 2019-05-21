const express = require('express');
const router = express.Router();
const Controller = require('../controllers/courseManageController')


router.route('/:_id').get(Controller.index)
router.route('/teacherManage/:courseId').get(Controller.manageTeacher)
router.route('/teacherManage/addTeacher/:idTeacher/:courseId').get(Controller.addTeacher)
router.route('/teacherManage/deleteTeacher/:idTeacher/:courseId').get(Controller.deleteTeacher)
router.route('/studentManage/:courseId').get(Controller.manageStudent)
router.route('/studentManage/addStudent/:idStudent/:courseId').get(Controller.addStudent)
router.route('/studentManage/deleteStudent/:idStudent/:courseId').get(Controller.deleteStudent)
router.route('/addCourse').post(Controller.addCourse)
router.route('/post').post(Controller.postCourse)
router.route('/manageTestRoom/:examId').get(Controller.manageTestRoom)
router.route('/deleteExam/:examId/:courseId').get(Controller.deleteExam)
router.route('/update/:id').post(Controller.updateCourse)
router.route('/delete/:id/:sub_id').get(Controller.deleteCourse)
router.route('/courseInfo/:courseId').get(Controller.courseInfo)
router.route('/courseInfo/addExam/:courseId').post(Controller.addExam)
router.route('/manageTestRoom/addTestRoom/:roomId/:examId').get(Controller.addTestRoom)
router.route('/manageTestRoom/deleteTestRoom/:roomId/:examId').get(Controller.deleteTestRoom)
router.route('/autoFillSeat/:examId/:roomId').get(Controller.autoFillSeat)
router.route('/manageExaminer/:examId/:roomId').get(Controller.manageExaminer)
router.route('/manageExaminer/add/:examinerId/:examId/:roomId').get(Controller.addExaminer)
router.route('/manageExaminer/delete/:examinerId/:examId/:roomId').get(Controller.deleteExaminer)

router.get('/courseInfoForTeacher/:courseId/:teacherId' , (req,res)=>{
    require('../models/modelTeacher').findById(req.params.teacherId , (err,teacher) => {
        require('../models/modelCourse').findById(req.params.courseId,(err,course)=>{
            res.render('pages/courseInfoForTeacher' , {course : course , teacher : teacher})
        }).populate(['sub_id', 'teacher', 'student', 'exam'])
    })
})



module.exports = router