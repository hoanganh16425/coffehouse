class newController {
    // [GET] /tin-tuc
    new(req,res){
        res.render('news',{un: req.session.username});
    } 
}

module.exports = new newController()