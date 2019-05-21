const Building = require('../models/modelBuilding')


module.exports = {
    index: (req, res) => {
        const id = req.params.id;
        Building.findById(id, function (err, building) {
            if (err) {
                console.log(err)
            } else {
                res.render('pages/roomManage', { building, building })
            }
        })
    },
    post: (req, res) => {
        var obj = {
            room_name: req.body.roomName,
            floor_room: req.body.floor,
            column_room: req.body.column,
            row_room: req.body.row
        }
        console.log(obj);

        Building.findByIdAndUpdate({ _id: req.params.id }, { $push: { room: obj } }, function (err, building) {
            if (err) {
                console.log(err)
            } else {
                building.save()
                res.redirect(`/manageBuilding/room/${req.params.id}`)
            }
        })
    },
    update: (req, res) => {

    },
    delete: (req, res) => {

    }
}