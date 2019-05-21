const express = require('express');
const router = express.Router();

const Controller = require('../controllers/yearManageController')

router.route('/').get(Controller.index)
router.route('/update').post(Controller.update)

module.exports = router