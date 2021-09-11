const mysql = require('mysql');

const db = mysql.createConnection(
    {host: "us-cdbr-east-04.cleardb.com", user: "b37ef9ea831eb8", password: "32280712", database: 'heroku_1a2e1bfc3017161'}
)

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  });

module.exports = db