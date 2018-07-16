var express    = require('express')
var bodyParser = require('body-parser')

var server  = express()

server.use(bodyParser.json())
server.use(express.static(__dirname + '/view'))

server.listen(process.env.PORT || 8000)