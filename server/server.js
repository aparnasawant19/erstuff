const express  = require('express')
const bodyParser = require('body-parser')

const routerCategory = require('./Category')
const routerUser = require('./user')
const routerPost_ad = require('./post_ad')
const routerProduct = require('./product')
const routerAdmin = require('./admin')

const app = express()
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(bodyParser.json())
app.use(express.static('thumbnails'))
app.use('/Category',routerCategory)
app.use('/user', routerUser)
app.use('/post_ad',routerPost_ad)
app.use('/product',routerProduct)
app.use('/admin',routerAdmin)

app.listen(4000,'0.0.0.0',()=>{
    console.log('server started on 4000')
})
