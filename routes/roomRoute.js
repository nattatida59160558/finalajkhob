const express = require('express');
const router = express.Router();

const Controller = require('../controllers/roomManageController')

router.route('/').get(Controller.index)
router.route('/post').post(Controller.post)
router.route('/update').post(Controller.update)
router.route('/delete/:id').get(Controller.delete)

module.exports = router