const mysql = require('mysql')

function connect() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'Rail_Reservation',
        password: 'rail_reservation',
        database: 'Railway_DB',
        port: 3306
    })

    connection.connect()
    return connection
}

module.exports = {
    connect: connect
}