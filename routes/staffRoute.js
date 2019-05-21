const express = require('express');
const router = express.Router();

//require controller
const Controller = require('../controllers/staffManageController')

router.route('/').get(Controller.index)
router.route('/post').post(Controller.post)
router.route('/update').post(Controller.update)
router.route('/delete/:id').get(Controller.delete)

router.get('/showExaminationList/:staffId' , (req ,res) => {
    require('../models/modelStaff').findById(req.params.staffId , (err , staff) => {
        res.render('pages/showExaminationForStaff', {staff : staff})
    }).populate({path: "examination" ,  populate : [{path:"course" , populate : {path : "sub_id"}} , {path:'room'}] })
})

module.exports = router