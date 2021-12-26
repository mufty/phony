const phonyAudio = require('./audio/device'),
    phonyNet = require('./net/server');

let ai;
let server;

const PORT = 18561;

process.on('SIGINT', () => {
    console.log('Received SIGINT. Stopping recording.');
    if (ai)
        ai.quit();

    if (server)
        server.close(() => {
            console.log('Server stopped');
        });

    process.exit();
});

module.exports = () => {
    let server = phonyNet.create(PORT);

    ai = phonyAudio.create();

    ai.on('data', buf => {
        server.send(buf);
        console.log(buf);
    });
}