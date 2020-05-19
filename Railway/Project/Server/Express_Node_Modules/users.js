const db = require('./db')
const express = require('express')
const utils = require('./utils')

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Users`
    connection.query(statement, (error, data) => {
        connection.end()
        const users = []
        for (let index = 0; index < data.length; index++) {
            const admin = data[index]
            users.push({
                id: admin['UserID'],
                firstname: admin['First_Name'],
                lastname: admin['Last_Name'],
                age: admin['Age'],
                gender: admin['Gender'],
                email: admin['Email'],
                password: admin['Password'],
                mobile: admin['MobileNumber'],
                address: admin['Address']
            })
        }
        response.send(utils.createResult(error, users))
    })
})

router.post('/', (request, response) => {
    const {firstname,lastname,age,gender,email,password,mobile,address} = request.body
   // const encryptedPassword = '' + cryptoJs.MD5(Password)
    const connection = db.connect()
    const statement = `insert into Users (First_Name,Last_Name,Age,Gender,Email,Password,MobileNumber,Address) values ('${firstname}','${lastname}','${age}','${gender}','${email}', '${password}','${mobile}','${address}')`
    console.log(statement);
    connection.query(statement, (error, data) => {
        connection.end()
        console.log(error);
        response.send(utils.createResult(error, data))
    })
})

router.post('/login', (request, response) => {
    const {Email, Password} = request.body
    //const encryptedPassword = '' + cryptoJs.MD5(password)
    const connection = db.connect()
    const statement = `select * from Users where Email = '${Email}' and Password = '${Password}'`
    connection.query(statement, (error, users) => {
        connection.end()
        
        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const info = {
                UserID: user['UserID'],
                Email: user['Email'],
                Password: user['Password'],
                Role: user['Role']
            }
            response.send(utils.createResult(null, info))
        }
    })
})

router.post('/register', (request, response) => {
    const {First_Name,Last_Name,Age,Gender,Email,Password,MobileNumber,Address,Role} = request.body
    //const encryptedPassword = '' + cryptoJs.MD5(password)
    const connection = db.connect()

    const statement1 = `select * from Users where Email = '${Email}'`
    connection.query(statement1, (error, users) => {

        if (users.length == 0) {
            // user with the required email does not exist

            // insert a new record
            const statement = `insert into Users (First_Name,Last_Name,Age,Gender,Email,Password,MobileNumber,Address,Role) values ('${First_Name}','${Last_Name}',${Age},'${Gender}','${Email}', '${Password}','${MobileNumber}','${Address}','${Role}')`
            connection.query(statement, (error, data) => {
                connection.end()
                response.send(utils.createResult(error, data))
            })
        } else {
            // user with email already exists
            connection.end()
            response.send(utils.createResult('Email exists. Please use another email.'))
        }


    })
})

router.post('/registration', (request, response) => {
    const {First_Name,Last_Name,Age,Gender,Email,Password,MobileNumber,Address,Role} = request.body
    //const encryptedPassword = '' + cryptoJs.MD5(password)
    const connection = db.connect()

    const statement1 = `select * from Users where Email = '${Email}'`
    connection.query(statement1, (error, users) => {

        if (users.length == 0) {
            // user with the required email does not exist

            // insert a new record
            const statement = `insert into Users (First_Name,Last_Name,Age,Gender,Email,Password,MobileNumber,Address) values ('${First_Name}','${Last_Name}',${Age},'${Gender}','${Email}', '${Password}','${MobileNumber}','${Address}','${Role}')`
            connection.query(statement, (error, data) => {
                connection.end()
                response.send(utils.createResult(error, data))
            })
        } else {
            // user with email already exists
            connection.end()
            response.send(utils.createResult('Email exists. Please use another email.'))
        }


    })
})
router.put('/:UserID', (request, response) => {
    const {UserID} = request.params
    const {First_Name,Last_Name,Age,Email,Password,MobileNumber,Address} = request.body
    const connection = db.connect()
    const statement = `update Users set First_Name = '${First_Name}',Last_Name = '${Last_Name}',Age = ${Age},Email = '${Email}',Password = '${Password}',MobileNumber = '${MobileNumber}',Address = '${Address}' where UserID = ${UserID}`
    connection.query(statement, (error, data) => {
        connection.end()
        /*const admins = []
        for (let index = 0; index < data.length; index++) {
            const admin = data[index]
            admins.push({
                id: admin['UserID'],
                firstname: admin['First_Name'],
                lastname: admin['Last_Name'],
                age: admin['Age'],.Address
                gender: admin['Gender'],
                email: admin['Email'],
                password: admin['Password'],
                mobile: admin['MobileNumber'],
                address: admin['Address']
            })
        }*/
        response.send(utils.createResult(error, data))
    })
})
module.exports = router