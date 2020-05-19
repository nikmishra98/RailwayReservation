const db = require('./db')
const express = require('express')
const utils = require('./utils')
const multer = require('multer')
const upload = multer({ dest: 'thumbnails/'})
const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select Train_no,Train_name,Source,Destination,Duration from Train`
    connection.query(statement, (error, data) => {
        connection.end()
        const trains = []
        for (let index = 0; index < data.length; index++) {
            const train = data[index]
            trains.push({
                Train_no: train['Train_no'],
                Train_name: train['Train_name'],
                Source: train['Source'],
                Destination: train['Destination'],
                Duration: train['Duration']
            })
        }
        console.log('helloo....from console')
        response.send(utils.createResult(error, trains))
    })
})

router.get('/:Train_no', (request, response) => {
    const {Train_no} = request.params
    const connection = db.connect()
    const statement = `select Train_no,Train_name,Source,Destination,Duration from Train where Train_no = '${Train_no}'`
    connection.query(statement, (error, data) => {
        connection.end()
        const trains = []
        for(let index = 0; index < data.length; index++) {
            const train = data[index]
            trains.push({
                Train_no: train['Train_no'],
                Train_name: train['Train_name'],
                Source: train['Source'],
                Destination: train['Destination'],
                Duration: train['Duration']
            })
        }
        response.send(utils.createResult(error, trains))
    })
})

router.post('/',upload.single('thumbnail'),  (request, response) => {
    const {Train_no,Train_name,No_of_coaches,Source ,Destination,Duration} = request.body
   // const encryptedPassword = '' + cryptoJs.MD5(Password)
    const connection = db.connect()
    const statement = `insert into Train (Train_no,Train_name,No_of_coaches,Source,Destination,Duration) values 
    ('${Train_no}','${Train_name}','${No_of_coaches}','${Source}','${Destination}','${Duration}')`
    console.log(statement);
    connection.query(statement, (error, data) => {
        connection.end()
       // console.log(error);
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:Train_no', (request, response) => {
    const {Train_no} = request.params
    const connection = db.connect()
    const statement = `delete from Train where Train_no = ${Train_no}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

/*router.get('/getSD',(request,response) => {
    console.log('data.......')
    const connection = db.connect()
    console.log('inside connection.......')
    const statement = `select Source,Destination from Train`
    console.log('get API called')
    connection.query(statement,(error,data) => {
        connection.end()
        const trains = []
        for (let index = 0; index < data.length; index++) {
            const train = data[index]
            trains.push({
                Source: train['Source'],
                Destination: train['Destination']
            })
        }
        console.log(data)
        response.send(utils.createResult(error, trains))
    })
})*/

/*router.post('/login', (request, response) => {
    const {Email, Password} = request.body
    //const encryptedPassword = '' + cryptoJs.MD5(password)
    const connection = db.connect()
    const statement = `select * from Admin where Email = '${Email}' and Password = '${Password}'`
    connection.query(statement, (error, users) => {
        connection.end()
        
        if (users.length == 0) {
            response.send(utils.createResult('user does not exist'))
        } else {
            const user = users[0]
            const info = {
                Email: user['Email'],
                Password: user['Password']
            }
            response.send(utils.createResult(null, info))
        }
    })
})
*/


module.exports = router