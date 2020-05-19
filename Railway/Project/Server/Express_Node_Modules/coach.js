const db = require('./db')
const express = require('express')
const utils = require('./utils')
const multer = require('multer')
const upload = multer({ dest: 'thumbnails/'})

const router = express.Router()

router.get('/', (request, response) => {
    const connection = db.connect()
    const statement = `select * from Coach`
    connection.query(statement, (error, data) => {
        connection.end()
        const coaches = []
        for (let index = 0; index < data.length; index++) {
            const coach = data[index]
            coaches.push({
                Position_from_Engine: coach['Position_from_Engine'],
                Coach_no: coach['Coach_no'],
                Coach_code: coach['Coach_code'],
                Coach_type: coach['Coach_type'],
                Capacity_by_Passenger: coach['Capacity_by_Passenger']
            })
        }
        response.send(utils.createResult(error, coaches))
    })
})

router.post('/',(request,response)=>{
    const{Position_from_Engine,Coach_no,Coach_code,Coach_type,Capacity_by_Passenger} = request.body
    const connection = db.connect()
    const statement = `insert into Coach(Position_from_Engine,Coach_no,Coach_code,Coach_type,Capacity_by_Passenger) values(${Position_from_Engine},'${Coach_no}','${Coach_code}','${Coach_type}',${Capacity_by_Passenger})`    
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

router.delete('/:Position_from_Engine', (request, response) => {
    const {Position_from_Engine} = request.params
    const connection = db.connect()
    const statement = `delete from Coach where Position_from_Engine = ${Position_from_Engine}`
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})


module.exports = router