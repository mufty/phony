const net = require('net');
const zmq = require('zeromq');
const sock = zmq.socket('pair');

let socket;
let serverInstance;

module.exports = {
    create: (port, onData) => {
        sock.bindSync("tcp://*:" + port);
        console.log('Pair bound to port ' + port);

        sock.on('message', (message) => {
            console.log(`Data received from client: ${message}.`);
            if (message)
                onData(message);
        });

        sock.on('connect', function(fd, ep) {
            console.log('connect, endpoint:', ep);
        });
        sock.on('connect_delay', function(fd, ep) {
            console.log('connect_delay, endpoint:', ep);
        });
        sock.on('connect_retry', function(fd, ep) {
            console.log('connect_retry, endpoint:', ep);
        });
        sock.on('listen', function(fd, ep) {
            console.log('listen, endpoint:', ep);
        });
        sock.on('bind_error', function(fd, ep) {
            console.log('bind_error, endpoint:', ep);
        });
        sock.on('accept', function(fd, ep) {
            console.log('accept, endpoint:', ep);
        });
        sock.on('accept_error', function(fd, ep) {
            console.log('accept_error, endpoint:', ep);
        });
        sock.on('close', function(fd, ep) {
            console.log('close, endpoint:', ep);
        });
        sock.on('close_error', function(fd, ep) {
            console.log('close_error, endpoint:', ep);
        });
        sock.on('disconnect', function(fd, ep) {
            console.log('disconnect, endpoint:', ep);
        });

        sock.monitor(500, 0);

        serverInstance = sock;

        return serverInstance;
    },
    getServer: () => {
        return serverInstance;
    }
}