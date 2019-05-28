const express = require("express");
const serverless = require("serverless-http");

const app=express();
app.get("/tasks", function (request, response){
  const username = request.query.username;
  
    const tasklist = {
      message: "Task1" + username + ", Task2"+", Task 3"
    };
    response.json(tasklist);
});

module.exports.handler = serverless(app);