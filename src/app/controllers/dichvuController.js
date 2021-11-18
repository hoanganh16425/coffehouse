const Service = require('../model/Service')
class dichvuController {
    // [GET] /lien-he
    dichvu(req,res){
        res.render('dichvu',{un: req.session.username});
    } 
    datban(req,res,next){
        const service = new Service(req.body)
        service.save()
            .then(() => res.redirect('/'))
            .catch(error => {              
            })
    }
}

module.exports = new dichvuController()