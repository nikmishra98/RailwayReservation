const db = require('./db')
const express = require('express')
const utils = require('./utils')
const multer = require('multer')
const upload = multer({ dest: 'thumbnails/'})

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select Ticket_no,Coach_type,Coach_no,Train_no,No_of_seats from Ticket`
    connection.query(statement, (error, data) => {
        connection.end()
        const tickets = []
        for (let index = 0; index < data.length; index++) {
            const ticket = data[index]
            tickets.push({
                Ticket_no: ticket['Ticket_no'],
                Coach_type: ticket['Coach_type'],
                Coach_no: ticket['Coach_no'],
                Train_no: ticket['Train_no'],
                No_of_seats: ticket['No_of_seats']
            })
        }
        response.send(utils.createResult(error, tickets))
    })
})

router.post('/',upload.single('thumbnail'),  (request, response) => {
    const {Source,Destination,Coach_name,Coach_code,Train_no,Train_name} = request.body
   // const encryptedPassword = '' + cryptoJs.MD5(Password)
    const connection = db.connect()
    const statement = `insert into Ticket (Source,Destination,Coach_name,Coach_code,Train_no,Train_name,No_of_seats) values ('${Source}','${Destination}','${Coach_name}','${Coach_code}',${Train_no},'${Train_name}',${No_of_seats})`
    console.log(statement);
    connection.query(statement, (error, data) => {
        connection.end()
        console.log(error);
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:Ticket_no', (request, response) => {
    const {Ticket_no} = request.params
    const connection = db.connect()
    const statement = `delete from Ticket where Ticket_no = ${Ticket_no}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.put('/:Ticket_no', (request, response) => {
    const {Ticket_no} = request.params
    const {Coach_no} = request.body
    const {Fare} = request.body
    const connection = db.connect()
    const statement = `update Ticket set Coach_no = '${Coach_no}', Fare = '${Fare}' where Ticket_no = ${Ticket_no}`
    connection.query(statement, (error, data) => {
        connection.end()
        const tickets = []
        for (let index = 0; index < data.length; index++) {
            const ticket = data[index]
            tickets.push({
                PNR_No: ticket['PNR_No'],
                Ticket_no: ticket['Ticket_no'],
                No_of_seats: ticket['No_of_seats'],
                Source_Departure_Time: ticket['Source_Departure_Time'],
                Destination_Arrival_Time: ticket['Destination_Arrival_Time'],
                Fare: ticket['Fare'],
                Coach_name: ticket['Coach_name'],
                Train_no: ticket['Train_no']
            })
        }
        response.send(utils.createResult(error, data))
    })
})

router.get('/getCoach', (request, response) => {
    const connection = db.connect()
    const statement = `select Coach_no,Coach_type from Coach`
    connection.query(statement, (error, data) => {
        connection.end()
        const coaches = []
        for (let index = 0; index < data.length; index++) {
            const coach = data[index]
            coaches.push({
                Coach_no: coach['Coach_no'],
                Coach_type: coach['Coach_type']
            })
        }
        response.send(utils.createResult(error, coaches))
    })
})

router.get('/getSeats', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Seats`
    connection.query(statement, (error, data) => {
        connection.end()
        const seats = []
        for (let index = 0; index < data.length; index++) {
            const seat = data[index]
            seats.push({
                No_of_seats: seat['No_of_seats']
            })
        }
        response.send(utils.createResult(error, seats))
    })
})

router.post('/addTicket',upload.single('thumbnail'),  (request, response) => {
    const {Source,Destination,Coach_type,Coach_no,Train_no,Train_name,No_of_seats} = request.body
   // const encryptedPassword = '' + cryptoJs.MD5(Password)
    const connection = db.connect()
    const statement = `insert into Ticket (Source,Destination,Coach_type,Coach_no,Train_no,Train_name,No_of_seats) values ('${Source}','${Destination}','${Coach_type}','${Coach_no}',${Train_no},'${Train_name}',${No_of_seats})`
    console.log(statement);
    connection.query(statement, (error, data) => {
        connection.end()
        console.log(error);
        response.send(utils.createResult(error, data))
    })
})
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