class contactController {
    // [GET] /lien-he
    contact(req,res){
        res.render('contact',{un: req.session.username});
    } 
}

module.exports = new contactController()