const express = require('express');
const router = express.Router();

const Controller = require('../controllers/loginController')

router.route('/').post(Controller.check)


module.exports = router