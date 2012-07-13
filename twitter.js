var express = require('express')     ;
var app     = express.createServer() ;

app.get('/', function(req, res){ //Get request. Filter based on HTTP verbs, and specific URLs
  res.send('Welcome to Mikes Node Twitter');
});

app.listen(2395)                            ;
console.log('Starting Node Twitter Server') ;
