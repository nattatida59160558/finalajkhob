


module.exports = {
        index: (req, res) => {
            console.log(req.params)
            res.render('pages/adminMenu')
        }
}