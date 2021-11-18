class introController {
    // [GET] /gioi-thieu
    intro(req,res){
        res.render('gioithieu', {un: req.session.username});
    } 
}

module.exports = new introController()