const siteRouter = require('./Site')
const introRouter = require('./Intro')
const prodRouter = require('./Product')
const contactRouter = require('./contact')
const newRouter = require('./New')
const signinRouter = require('./users')
const searchRouter = require('./search')
const dichvuRouter = require('./dichvu')
const cartRouter = require('./cart')
const adminRouter = require('./admin')

function route(app) {
    app.use('/gioi-thieu', introRouter)
    app.use('/san-pham', prodRouter)
    app.use('/lien-he', contactRouter)
    app.use('/tin-tuc', newRouter)
    app.use('/user', signinRouter)
    app.use('/search', searchRouter)
    app.use('/dich-vu', dichvuRouter)
    app.use('/cart', cartRouter)
    app.use('/admin', adminRouter)
    app.use('/', siteRouter)
   }

module.exports = route