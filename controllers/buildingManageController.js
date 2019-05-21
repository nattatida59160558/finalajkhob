const Building = require('../models/modelBuilding')
const Room = require('../models/modelRoom')

module.exports = {
    index: (req, res) => {
        Building.find(function (err, building) {
            if (err) {
                console.log(err)
            } else {
                res.render('pages/buildingManage', { building, building })
            }
        })
    },
    post: (req, res) => {
        const building = new Building(req.body)
        building.save().then(building => {
            res.redirect('/manageBuilding')
        }).catch(err => {
            console.log(err)
            res.status(400).send("unable to save to database")
        })
    },
    update: (req, res) => {
        Building.findByIdAndUpdate(req.body._id, {
            buildingName: req.body.editbuildingName,
            floor: req.body.editfloor
        }, (err, data) => {
            console.log(req.body._id)
            console.log(req.body)
            if (err) {
                return res.status(500).send(err.message)
            }
            res.redirect('/manageBuilding')
        })
    },
    delete: (req, res) => {
        Building.findByIdAndRemove({ _id: req.params.id },
            function (err, building) {
                if (!building) res.json(building)
                else res.redirect('/manageBuilding')
            })
    },
    room: (req, res) => {
        const id = req.params.id;
        Building.findById(id, function (err, building) {
            if (err) {
                console.log(err)
            } else {
                res.render('pages/roomManage', { building, building })
            }
        }).populate('room')
    },
    addRoom: (req, res) => {
        var obj = new Room({
            name: req.body.roomName,
            floor: req.body.floor,
            col: req.body.column,
            row: req.body.row
        })

        var seatArr = obj.seat

        var az = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

        for (let i = 0; i < obj.row; i++) {
            for (let j = 0; j < obj.col; j++) {
                seatArr.push({ no: `${az[i] + (j + 1)}` })
            }
        }

        obj.seat = seatArr

        Building.findById(req.params.id, (err, building) => {
            obj.building = building
            obj.save().then(room => {
                Building.findById(req.params.id, function (err, building) {

                    if (err)
                        console.log(err)
                    obj.save().then(room => {

                        // console.log(room)
                        let roomArr = building.room

                        roomArr.push(room)

                        building.room = roomArr

                        building.save().then(buildings => {
                            // console.log(buildings)
                        })
                    })
                    res.redirect(`/manageBuilding/room/${req.params.id}`)
                })
            })
        })
    },
    deleteRoom: (req, res) => {
        const buildingId = req.params.buildingId
        const roomId = req.params.roomId

        Room.findById(roomId, (err, room) => {
            room.remove().then(result => {
                res.redirect(`/manageBuilding/room/${req.params.buildingId}`)
            })
        })
    },
    updateRoom: (req, res) => {
        Course.findById(req.params.id, function (err, course) {
            if (!course)
                return next(new Error('Could not load Document'))
            else {
                // do your updates here
                course.course_id = req.body.course_id
                course.course_name = req.body.course_name
                course.section = req.body.section
                course.year = req.body.year
                course.save().then(course => {
                    res.redirect('/manage/course')
                })
                    .catch(err => {
                        res.status(400).send("unable to update the database")
                    })
            }
        })
    },
    inRoom: (req, res) => {
        Room.findById(req.params.roomId, (err, room) => {
            require('../models/modelExam').findById(req.params.examId, (err, exam) => {
                require('../models/modelCourse').findById(req.params.courseId , (err , course) => {
                    res.render('pages/inRoom', { room: room, exam: exam , course : course})
                })
            })
        }).populate(['building', 'examiner'])
    },
    clearRoom: (req, res) => {
        Room.findById(req.params.roomId, (err, room) => {
            for (let i = 0; i < room.seat.length; i++) {
                room.seat[i].student = null
                room.seat[i].course = null
            }
        })
    }
}