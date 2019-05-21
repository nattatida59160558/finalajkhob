const express = require('express');
const router = express.Router();

const Controller = require('../controllers/menuController')

router.route('/admin').get(Controller.index)



module.exports = router