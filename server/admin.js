const db = require('./db')
const utils = require('./utils')
const express = require('express')
const cryptoJs = require('crypto-js')

const router = express.Router()



router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Admin`
    connection.query(statement, (error, data) => {
        connection.end()
        const admins = []
        for (let index = 0; index < data.length; index++) {
            const admin = data[index]
            admins.push({
                id: admin['a_id'],
                a_name: admin['a_name'],
                a_email: admin['a_email'],
            })
        }
        response.send(utils.createResult(error, admins))
    })
})
router.post('/login', (request, response) => {
    const {a_email, password} = request.body
   // const encryptedPassword = '' + (password)
    const connection = db.connect()
    const statement = `select * from Admin where a_email = '${a_email}' and password = '${password}'`
    connection.query(statement, (error, admins) => {
        connection.end()
        
        if (admins.length == 0) {
            response.send(utils.createResult('admin does not exist'))
        } else {
            const admin = admins[0]
            const info = {
                a_name: admin['a_name'],
                a_email: admin['a_email']
            }
            response.send(utils.createResult(null, info))
        }
    })
})
//     router.post('/register', (request, response) => {
//         const {uname,address,college_name,branch,email,mobile_no, password} = request.body
//         const encryptedPassword = '' + cryptoJs.MD5(password)
//         const connection = db.connect()
    

//     const statement = `insert into User (uname,address,college_name,branch,email,mobile_no,password) values ('${uname}', '${address}', '${college_name}','${branch}','${email}',${mobile_no}, '${password}')`
    
//     connection.query(statement, (error, data) => {
//         connection.end()
//         response.send(utils.createResult(error, data))
//     })
// })
// router.delete('/:uid',(request,response)=>{
//     const {uid} = request.params
//     const connection = db.connect()
//     const statement = `delete from User where uid = ${uid}`
//     connection.query(statement,(error,data)=>{
//         connection.end()
//         response.send(utils.createResult(error,data))
//     })
// })
module.exports = router