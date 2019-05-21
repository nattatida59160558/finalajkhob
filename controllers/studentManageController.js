const Student = require('../models/modelStudent')
const bcrypt = require('bcrypt')

module.exports = {
    index: (req, res) => {
        Student.find({ uType: "student" }, function (err, person) {
            if (err) {
                console.log(err)
            } else {
                res.render('pages/studentManage', { person: person })
            }
        })
    },
    post: (req, res) => {
        const stud = new Student(req.body)
        bcrypt.hash(req.body.password, 4, (err, hash) => {
            stud.password = hash
            stud.save().then(stud => {
                res.redirect('/manageStudent')
            }).catch(err => {
                console.log(err)
                res.status(400).send("unable to save to database")
            })
        })
    },
    update: (req, res) => {
        bcrypt.hash(req.body.editpassword, 4, (err, hash) => {
            if (req.body.editpassword.length == 60) {
                Student.findByIdAndUpdate(req.body._id, {
                    username: req.body.editusername,
                    password: req.body.editpassword,
                    prefixName: req.body.editprefixName,
                    firstName: req.body.editfirstName,
                    lastName: req.body.editlastName,
                    faculty: req.body.editfaculty,
                    major: req.body.editmajor,
                    year: req.body.edityear,
                    branch: req.body.editbranch,
                    sector: req.body.editsector,
                    uType: req.body.edituType
                }, (err, data) => {
                    console.log(req.body._id)
                    console.log(req.body)
                    if (err) {
                        return res.status(500).send(err.message)
                    }
                    res.redirect('/manageStudent')
                })
            } else {
                Student.findByIdAndUpdate(req.body._id, {
                    username: req.body.editusername,
                    password: hash,
                    prefixName: req.body.editprefixName,
                    firstName: req.body.editfirstName,
                    lastName: req.body.editlastName,
                    faculty: req.body.editfaculty,
                    major: req.body.editmajor,
                    year: req.body.edityear,
                    branch: req.body.editbranch,
                    sector: req.body.editsector,
                    uType: req.body.edituType
                }, (err, data) => {
                    console.log(req.body._id)
                    console.log(req.body)
                    if (err) {
                        return res.status(500).send(err.message)
                    }
                    res.redirect('/manageStudent')
                })
            }
        })
    },
    delete: (req, res) => {
        Student.findByIdAndRemove({ _id: req.params.id },
            function (err, person) {
                if (!person) res.json(person)
                else res.redirect('/manageStudent')
            })
    }


}