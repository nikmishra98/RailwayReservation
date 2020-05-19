const express = require('express')
const db = require('./db')
const utils = require('./utils')

const router = express.Router()

router.get('/',(request,response)=>{
    const connection = db.connect()
    const statement = `select * from Passenger`
    connection.query(statement,(error,data)=>{
        connection.end()
        const passengers = []
        for(let index = 0; index < data.length; index++){
            const passenger = data[index]
            passengers.push({
                PNR_No: passenger['PNR_No'],        
                Passenger_name: passenger['Passenger_name'], 
                Age: passenger['Age'],            
                Gender: passenger['Gender'],         
                Email: passenger['Email'],          
                Mobile_no: passenger['Mobile_no'],      
                Address: passenger['Address'],        
                Transaction_ID: passenger['Transaction_ID']
            })
        }
        response.send(utils.createResult(error,passengers))
    })
})

router.post('/',(request,response)=>{
    const{PNR_No,Passenger_name,Age,Gender,Email,Mobile_no,Address,Transaction_ID} = request.body
    const connection = db.connect()
    const statement = `insert into Passenger(PNR_No,Passenger_name,Age,Gender,Email,Mobile_no,Address,Transaction_ID) values('${PNR_No}','${Passenger_name}',${Age},'${Gender}','${Email}','${Mobile_no}','${Address}','${Transaction_ID}')`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

module.exports = router