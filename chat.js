var net = require('net'); //include net module: contains all the TCP stuff for Node

var chatServer = net.createServer(); //create TCP server
var clientList = [];

chatServer.on('connection', function(client){ // listener to execute function when connected
  // When connected, a call back passes a reference to the TCP socket for new client
  // We are naming that reference 'client'
  client.name = client.remoteAddress + ':' + client.remotePort ;
  client.write('Hi! ' + client.name + '\n')                    ;
  console.log(client.name + ' joined');
  clientList.push(client)                                      ;
  // client.write('Bye!\n')                                    ;
  // client.end()                                              ;
  client.on('data', function(data){
    console.log(data.toString()) ; //data is passed as hex binary. Use toString to convert to string.
    console.log(data)            ;
    broadcast(data, client)      ;
  });

  client.on('end', function(){                        // when a client disconnects
    clientList.splice(clientList.indexOf(client), 1); // update the client list
    console.log(client.name + ' quit ');
  });

  client.on('error', function(e){
    console.log(e);
  });
});

function broadcast(message, client){
  var cleanup = [];
  for(var i=0; i<clientList.length; i+=1){
    if(client !== clientList[i]){
      if(clientList[i].writable){
        clientList[i].write(client.name +'->'+ message);
      }
      else{
        cleanup.push(clientList[i]);
        clientList[i].destroy;
      }
    }
  }
  for(var i=0; i<cleanup.length; i+=1){ //Remove dead Nodes out of write loop to avoid trashing loop index
    clientList.splice(clientList.indexOf(cleanup[i]), 1); 
  }
};

chatServer.listen(9000); // Directs node to which port to listen to
console.log('Server running at http://127.0.0.1:9000');
