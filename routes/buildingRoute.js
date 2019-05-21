const express = require('express');
const router = express.Router();

const Controller = require('../controllers/buildingManageController')

router.route('/').get(Controller.index)
router.route('/post').post(Controller.post)
router.route('/update').post(Controller.update)
router.route('/delete/:id').get(Controller.delete)
router.route('/room/:id').get(Controller.room)
router.route('/addRoom/:id').post(Controller.addRoom)
router.route('/deleteRoom/:roomId/:buildingId').get(Controller.deleteRoom)
router.route('/update/:id').post(Controller.updateRoom)
router.route('/inRoom/:roomId/:examId').get(Controller.inRoom)
router.route('/clearRoom/:roomId/:buildingId').get(Controller.clearRoom)
module.exports = router
