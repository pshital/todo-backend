const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql")
const app = express();

app.use(express.json());
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "todotask"
});
app.get("/tasks", function (request, response) {
  // const username = request.query.username;
  let queryToExcute = "SELECT * FROM Task";
  /*if (username) {
    query =
      "SELECT * FROM Task JOIN User on Task.UserId = User.UserId WHERE User.Username = " +
      connection.escape(username);
  }*/
  connection.query(queryToExcute, (err, queryResults) => {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.json({
        tasks: queryResults
      });
    }
  });
});

  app.post("/tasks", function (request, response) {
    const TaskToBeSend = request.body;
    //console.log(request.body);
    connection.query('INSERT  INTO Task SET ?', TaskToBeSend, function (error, results, fields) {
      if (error) {
        console.log("Error saving tasks", error);
        response.status(500).json({
          error: error
        });
      }
      else {
        response.json({
          TaskId: results.insertId
        });
      }

    });
  });

  module.exports.handler = serverless(app);