var express = require('express')     ;
var app     = express.createServer() ;
var tweets = [];

app.get('/', function(req, res){ //Get request. Filter based on HTTP verbs, and specific URLs
  res.send('Welcome to Mikes Node Twitter');
});

app.post('/send', express.bodyParser(), function(req, res){ //middleware for authentication, logging...etc
  if(req.body && req.body.tweet){
    tweets.push(req.body.tweet);
    res.send({status:"ok",message:"Tweet received"});
  }else{ //no tweets?
    res.send({status:"nok", message:"No tweet received"});
  }
});

app.get('/tweets', function(req, res){
  res.send(tweets);
});

console.log('Starting Node Twitter Server') ;
app.listen(8000);
