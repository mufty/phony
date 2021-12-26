const phonyAudio = require('./audio/device'),
    phonyPlayback = require('./audio/playback'),
    phonyNet = require('./net/server');

let ai;
let playback;
let server;

const PORT = 18561;

process.on('SIGINT', () => {
    console.log('Received SIGINT. Stopping recording.');

    if (playback)
        playback.close();

    if (ai)
        ai.quit();

    if (server)
        server.close(() => {
            console.log('Server stopped');
        });

    process.exit();
});

module.exports = () => {
    playback = phonyPlayback.create();

    let server = phonyNet.create(PORT, data => {
        if (playback)
            return;

        playback.write(data);
    });

    ai = phonyAudio.create();

    ai.on('data', buf => {
        server.send(buf);
        //console.log(buf);
    });
}