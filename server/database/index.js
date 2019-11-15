var mysql = require('mysql')

// Mysql db connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "streamboost"
})

con.connect(function(err) {
    if (err) throw err
})

module.exports = con