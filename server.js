const port = 3000
const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test123@ds117816.mlab.com:17816/ooad');

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

///////////// render หน้า login ////////////////////
app.get('/', (req, res) => {
    res.redirect('/login')
})
app.get('/login', (req, res) => {
    require('./models/modelYear').find({}, function (err , year) {
        res.render('pages/login', { err: false  , year : year}) 
    })
})
////////////////////////////////////////////////////


///////////////////// ALL ROUTE IS HERE ///////////////////////////////
app.use('/login', require('./routes/loginRoute'))
app.use('/menu', require('./routes/menuRoute')) //teacher
app.use('/manageStudent', require('./routes/studentRoute'))
app.use('/manageTeacher', require('./routes/teacherRoute'))
app.use('/manageStaff', require('./routes/staffRoute'))
app.use('/manageBuilding', require('./routes/buildingRoute'))
app.use('/manageSubject', require('./routes/subjectRoute'))
app.use('/manageYear', require('./routes/yearRoute'))
app.use('/manageCourse', require('./routes/courseRoute'))




// // app.use('/', require('./'))
///////////////////////////////////////////////////////////////////////



app.listen(port, function () {
    console.log(new Date() + " App is listening on port : " + port);
});