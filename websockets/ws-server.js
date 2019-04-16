var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 8081, path: '/testing'});
clients=[];
messages=[];
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