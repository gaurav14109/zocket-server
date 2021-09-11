const mysql = require('mysql');

const db = mysql.createConnection(
    {host: "localhost", user: "root", password: "", database: 'zocket'}
)

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  });

module.exports = db