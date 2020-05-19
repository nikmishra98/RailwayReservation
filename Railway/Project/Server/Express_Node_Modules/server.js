const express = require('express')
const bodyParser = require('body-parser')


// import the routers
const routerUsers = require('./users')
const routerTrain = require('./train')
const routerTicket = require('./ticket')
const routerCoach = require('./coach')
const routerPassenger = require('./passenger')
const routerPayment = require('./payment')
const routerSearchTrain = require('./search-train')

const app = express()

// add middlewares

// for CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json())
app.use('/users', routerUsers)
app.use('/train',routerTrain)
app.use('/ticket',routerTicket)
app.use('/coach',routerCoach)
app.use('/passenger',routerPassenger)
app.use('/payment',routerPayment)
app.use('/search-train',routerSearchTrain)

app.listen(5000, '0.0.0.0', () => {
    console.log('server started  on port 5000')
})