const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/',(request,response)=>{
    const connection = db.connect()
    const statement = `select p.pid,a.ad_title,c.cat_name,u.uname,a.ad_description,a.price_original,a.price_final,a.thumbnail from Product p
    INNER JOIN Post_ad a ON(p.ad_id = a.ad_id)
    INNER JOIN Category c ON(a.cat_id = c.cat_id) 
    INNER JOIN User u ON(a.uid = u.uid)`

    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })

})

router.post('/',(request,response)=>{
    const {uid,cat_id,ad_id} = request.body
    const connection = db.connect()
    const statement = `insert into Product(uid,cat_id,ad_id) values(${uid},${cat_id},${ad_id})`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})
module.exports = router