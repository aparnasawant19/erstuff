const db = require('./db')
const utils = require('./utils')
const express = require('express')
const cryptoJs = require('crypto-js')
const mailer = require('./mailer')

const router = express.Router()



router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from User`
    connection.query(statement, (error, data) => {
        connection.end()
        const users = []
        for (let index = 0; index < data.length; index++) {
            const user = data[index]
            users.push({
                id: user['id'],
                uname: user['uname'],
                address: user['address'],
                college_name: user['college_name'],
                branch: user['branch'],
                email: user['email'],
                role: user['role'],
                mobile_no: user['mobile_no']
            })
        }
        response.send(utils.createResult(error, users))
    })
})
router.post('/login', (request, response) => {
    const {email, password} = request.body
   // const encryptedPassword = '' + (password)
    const connection = db.connect()
    const statement = `select * from User where email = '${email}' and password = '${password}'`
    connection.query(statement, (error, users) => {
        connection.end()
        
        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const info = {
                uid: user['uid'],
                uname: user['uname'],
                email: user['email']
            }
            response.send(utils.createResult(null, info))
        }
    })
})
    router.post('/register', (request, response) => {
        const {uname,address,college_name,branch,email,mobile_no, password} = request.body
        const encryptedPassword = '' + cryptoJs.MD5(password)
        const connection = db.connect()
    

    const statement = `insert into User (uname,address,college_name,branch,email,mobile_no,password) values ('${uname}', '${address}', '${college_name}','${branch}','${email}',${mobile_no}, '${password}')`
    
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})
router.delete('/:uid',(request,response)=>{
    const {uid} = request.params
    const connection = db.connect()
    const statement = `delete from User where uid = ${uid}`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})
// router.delete('/:ad_id',(request,response)=>{
//     const {ad_id} = request.params
//     const connection = db.connect()
//     const statement = `delete from Post_ad where ad_id = ${ad_id}`
//     connection.query(statement,(error,data)=>{
//         connection.end()
//         response.send(utils.createResult(error,data))
//     })
// })
router.post('/reset-password', (request, response) => {
    const {uid, password} = request.body
    const encryptedPassword = '' + cryptoJs.MD5(password)
    const connection = db.connect()
    const statement = `update User set password = '${encryptedPassword}' where uid = ${uid}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})


router.post('/forgot-password', (request, response) => {
    const {email} = request.body
    const connection = db.connect()
    const statement = `select uid from User where email = '${email}'`
    connection.query(statement, (error, users) => {
        connection.end()
        
        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const uid = user['uid']

            const link = "http://localhost:4200/reset-password/" + uid
            console.log(link)

            const body = `<h1>welcome</h1>Please follow the link to reset your password: <br><br>${link}`

            mailer.send(email, body, 'link to reset your password', (error) => {
                response.send(utils.createResult(error))
            })
        }
    })
})
module.exports = router