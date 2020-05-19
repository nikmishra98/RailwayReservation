const express = require(`express`)
const db = require(`./db`)
const utils = require(`./utils`)

const router = express.Router()

router.get(`/`,(request, response) => {
    const connection = db.connect()
    const statement = `select * from loan_type`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.post(`/`, (request, response) => {
    const {loan_type} = request.body
    
    const connection = db.connect()
    const statement = `insert into loan_type (loan_type) value ('${loan_type}')`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
} )

router.put('/:id', (request, response) => {
    const {id} = request.params
    const {loan_type} = request.body

    const statement = `update loan_type set loan_type = '${loan_type}' where type_id = ${id}`
    const connection = db.connect()
    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

router.delete('/:id', (request, response) => {
    const {id} = request.params

    const connection = db.connect()
    const statement = `delete from loan_type where type_id = ${id}`

    connection.query(statement, (error, data) => {
        connection.end()
        response.send(utils.createResult(error, data))
    })
})

module.exports = router