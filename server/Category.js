const db = require('./db')
const utils = require('./utils')
const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Category`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post('/',(request,response)=>{
    const{cat_name} = request.body

    const connection = db.connect()
    const statement = `insert into Category (cat_name) values('${cat_name}')`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.put('/:id',(request,response)=>{
    const {id} = request.params
    const{cat_name} = request.body
    const connection = db.connect()
    const statement = `update Category set cat_name = '${cat_name}' where cat_id = ${id}`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.delete('/:id',(request,response)=>{
    const {id} = request.params
    const {cat_name} = request.body
    const connection = db.connect()
    const statement = `delete from Category where cat_id = ${id}`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})


// router.delete('/:id', (request, response) => {
//     const {id} = request.params
//     const connection = db.connect()
//     const statement = `delete from Category where id = ${id}`
//     connection.query(statement, (error, data) => {

//         // delete the products from this category
//         const statement2 = `delete from Product where categoryId = ${id}`
//         connection.query(statement2, (error, data) => {
//             connection.end()
//             response.send(utils.createResult(error, data))
//         })
//     })
// })
module.exports = router