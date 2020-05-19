const express = require('express')
const db = require('./db')
const utils = require('./utils')

const router = express.Router()

router.get('/',(request,response)=>{
    const connection = db.connect()
    const statement = `select * from Payment`
    connection.query(statement,(error,data)=>{
        connection.end()
        const payments = []
        for(let index = 0; index < data.length; index++){
            const payment = data[index]
            payments.push({
                Transaction_ID: payment['Transaction_ID'],
                Payment_Mode: payment['Payment_Mode']
            })
        }
        response.send(utils.createResult(error,payments))
    })
})

router.post('/',(request,response)=>{
    const{Transaction_ID,Payment_Mode} = request.body
    const connection = db.connect()
    const statement = `insert into Payment(Transaction_ID,Payment_Mode) values('${Transaction_ID}','${Payment_Mode}')`
    connection.query(statement,(error,data)=>{
        connection.end()
        response.send(utils.createResult(error,data))
    })
})

module.exports = router