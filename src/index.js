const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars');
const route = require('./routes');
const db=require('./config/db');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const app = express()
const port=3000 
//connect db
db.connect()
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))
//tempale engine
app.engine('hbs', handlebars({
    extname: '.hbs'
}))
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/coffeShop' })})
);
app.use(methodOverride('_method'))
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success')
  res.locals.error_messages = req.flash('error')
  next()
})

app.set('view engine','hbs')
app.set('views', path.join(__dirname, 'resources','view'))

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))

route(app)

