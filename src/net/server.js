const net = require('net');

let socket;

module.exports = {
    create: (port) => {
        const server = new net.Server();

        server.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        });

        server.on('conneciton', (socket) => {
            //assume p2p connection
            server.socket = socket;
            console.log('A new connection has been established.');

            // The server can also receive data from the client by reading from its socket.
            socket.on('data', (chunk) => {
                console.log(`Data received from client: ${chunk.toString()}.`);
            });

            // When the client requests to end the TCP connection with the server, the server
            // ends the connection.
            socket.on('end', () => {
                console.log('Closing connection with the client');
            });

            // Don't forget to catch error, for your own sake.
            socket.on('error', (err) => {
                console.log(`Error: ${err}`);
            });
        });

        server.send = (data) => {
            if (!server.socket) {
                console.log('No client connected.');
                return;
            }

            server.socker.write(data);
        };

        return server;
    }
}