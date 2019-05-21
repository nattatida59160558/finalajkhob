const express = require('express');
const router = express.Router();

const Controller = require('../controllers/subjectManageController')

router.route('/').get(Controller.index)
router.route('/create').post(Controller.post)
router.route('/updateSubject').post(Controller.update)
router.route('/change/:id').get(Controller.update2)
router.route('/delete/:id').get(Controller.delete)

module.exports = router