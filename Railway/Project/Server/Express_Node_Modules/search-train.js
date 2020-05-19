const db = require('./db')
const express = require('express')
const utils = require('./utils')
const multer = require('multer')
const upload = multer({ dest: 'thumbnails/'})

const router = express.Router()

router.get('/:Source/:Destination', (request, response) => {
    const {Source} = request.params
    const {Destination} = request.params
    const connection = db.connect()
    const statement = `select Train_no,Train_name,Source,Destination,Duration from Train where Source = '${Source}' and Destination = '${Destination}'`
    connection.query(statement, (error, data) => {
        connection.end()
        const stations = []
        for (let index = 0; index < data.length; index++) {
            const station = data[index]
            stations.push({
                Train_no: station['Train_no'],
                Train_name: station['Train_name'],
                Source: station['Source'],
                Destination: station['Destination'],
                Duration: station['Duration']
            })
        }
        if(data.length==0)
        {
            response.send(utils.createResult('no such train exist'))
        }
        else
           response.send(utils.createResult(error, stations))
    })
})


router.get('/getSource',(request,response) => {
    const connection = db.connect()
    const statement = `select distinct Source from Train`
    connection.query(statement,(error,data) => {
        connection.end()
        const stations = []
        for (let index = 0; index < data.length; index++) {
            const station = data[index]
            stations.push({
                Source: station['Source']
            })
        }
        response.send(utils.createResult(error, stations))
    })
})

router.get('/getDest',(request,response) => {
    const connection = db.connect()
    const statement = `select distinct Destination from Train`
    connection.query(statement,(error,data) => {
        connection.end()
        const stations = []
        for (let index = 0; index < data.length; index++) {
            const station = data[index]
            stations.push({
                Destination: station['Destination']
            })
        }
        response.send(utils.createResult(error, stations))
    })
})

router.get('/:Train_no',(request,response) => {
    const {Train_no} = request.params
    const connection = db.connect()
    const statement = `select Train_no,Train_name,Source,Destination from Train where Train_no = ${Train_no}`
    connection.query(statement,(error,data) => {
        connection.end()
        const stations = []
        for (let index = 0; index < data.length; index++) {
            const station = data[index]
            stations.push({
                Train_no: station['Train_no'],
                Train_name: station['Train_name'],
                Source: station['Source'],
                Destination: station['Destination']
            })
        }
        response.send(utils.createResult(error, stations))
    })
})
module.exports = router