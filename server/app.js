var express = require('express')
var path = require('path')

var app = express()
var port = process.env.PORT || 7070

// ENDPOINTS

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/favicon.ico', function (req, res) {
  res.sendStatus(200)
})

app.use(function (req, res, next) {
  res.status(404).send('Error 404')
})

// SERVER

app.listen(port, function () {
  console.log('App listening on port ' + port)
})
