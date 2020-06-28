// Node.js WebSocket server script
const http = require('http');
const { Console } = require('console');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(9898, () => { console.log('Server started') });
const wsServer = new WebSocketServer({
    httpServer: server
});
wsServer.on('request', function (request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function (message) {
        makeApiCall();
        console.log('Received Message:', message.utf8Data);
        connection.sendUTF('Hi this is WebSocket server!');
    });
    connection.on('close', function (reasonCode, description) {
        console.log('Client has disconnected.');
    });
});
function makeApiCall() {
    // const data = JSON.stringify({
    //     latitude: "Sanitizer",
    //     longitude: "Herbal Sanitizer"
    // });
    const options = {
        host: "localhost",
        port: 8080,
        path: "/product/controller/addLocPoint",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    };
    const req = http.request(options, (res) => {
        console.log("statusCode: ", res.statusCode);
        let result = "";
        res.on("data", (chunk) => {
            result += chunk;
        });
        res.on("end", () => {
            console.log("Result is: " + result);
        });
    });
    req.on("error", (err) => {
        console.log("Error: " + err.message);
    });
//    req.write(data);
    req.end();
    console.log('Made API request');
}
