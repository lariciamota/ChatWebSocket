var http = require("http");
var messages=[];

function getMessages () {
    return messages;
}

var server = http.createServer(function(req,res){
    res.writeHeader(200, {"Content-Type":"text/event-stream"
    , "Cache-Control":"no-cache"
    , "Connection":"keep-alive"
    , "Access-Control-Allow-Origin": "*"});
var interval = setInterval( function() {
    res.write("data: " + getMessages() + "\n\n");
},2000);
});

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({server});
var clients=[];
wss.on('connection', function(ws) {
    clients.push(ws);
    ws.on('message', function(message) {
        console.log('Msg received in server: %s ', message);
        messages.push(message);

        for(var i=0; i < clients.length; i++){
            if(ws !== clients[i] && clients[i].readyState === clients[i].OPEN){
                clients[i].send(message)
            }
        }
    });
    console.log('new connection');
});

server.listen(8081)