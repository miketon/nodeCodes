var http   = require('http')   ; // to serve HTTP requests and provides a client
var assert = require('assert') ; // to test values, throws exception on unmatched criteria

var opts = { //options object to init http request
  host    : 'localhost',
  port    : 8000,
  path    : '/send',
  method  : 'POST',
  headers : {'content-type':'application/x-www-form-urlencoded'} 
}
var req = http.request(opts, function(res){

  res.setEncoding('utf8') ;
  var data = ''           ;

  res.on('data', function(d){
    data += d;
  });

  res.on('end', function(){
    assert.strictEqual(data, '{"status":"ok","message":"Tweet received"}');
  });
});

req.write('tweet=test');
req.end();
console.log('Tweet test passed');
