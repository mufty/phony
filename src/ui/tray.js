const phonyNet = require('../net/server'),
    messageHandler = require('../net/message'),
    SysTray = require('systray2').default,
    os = require('os');

let server;
let systray;

const PORT = 18561;

const itemExit = {
    title: 'Close',
    tooltip: 'Close application',
    checked: false,
    enabled: true,
    click: () => {
        systray.kill(false);
        shutdown();
    }
}

let shutdown = () => {
    console.log('Received SIGINT. Stopping recording.');

    /*if (playback)
        playback.close();

    if (ai)
        ai.quit();*/

    if (server)
        server.close(() => {
            console.log('Server stopped');
        });

    process.exit();
}

process.on('SIGINT', () => {
    shutdown();
});

module.exports = {
    create: () => {
        systray = new SysTray({
            menu: {
                // you should use .png icon on macOS/Linux, and .ico format on Windows
                icon: os.platform() === 'win32' ? '../resources/mobile_phone.ico' : '../resources/mobile_phone.png',
                // a template icon is a transparency mask that will appear to be dark in light mode and light in dark mode
                isTemplateIcon: os.platform() === 'darwin',
                title: 'Phony',
                tooltip: 'Phony application',
                items: [
                    itemExit
                ]
            },
            debug: false,
            copyDir: true // copy go tray binary to an outside directory, useful for packing tool like pkg.
        });

        systray.onClick(action => {
            if (action.item.click != null) {
                action.item.click()
            }
        });

        systray.ready().then(() => {
            console.log('systray started!');

            let exec = async () => {
                server = phonyNet.create(PORT, data => {
                    try {
                        let obj = JSON.parse(data);
                        if (!obj)
                            return;

                        messageHandler.handle(obj);
                    } catch (e) {
                        console.log(e);
                    }
                });
            }

            exec();
        }).catch(err => {
            console.log('systray failed to start: ' + err.message);
        })
    }
}