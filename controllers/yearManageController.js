const Year = require('../models/modelYear')


module.exports = {
    index: (req, res) => {
        Year.find({}, function (err , year) {
            if(err) {
                console.log(err)
            }else {
                res.render('pages/yearManage' , {year , year})
            }
        })
    },
    update: (req,res) => {
        Year.findById("5cae048afb6fc01d56646220", function (err, year) {
            if (!year)
                return next(new Error('Could not load Document'))
            else {
                console.log(year)
                year.year = req.body.year
                year.semester = req.body.semester
                year.save().then(year => {
                    res.redirect('/manageYear')
                })
                    .catch(err => {
                        res.status(400).send("unable to update the database")
                    })
            }
        })
    
    }
}