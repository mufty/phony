const notifier = require('node-notifier');
const net = require('../net/server');

notifier.on('activate', () => {
    console.log('Clicked!');
});
notifier.on('dismissed', () => {
    console.log('Dismissed!');
});

// Buttons actions (lower-case):
notifier.on('ok', (notifierObject, options, event) => {
    console.log(`"Ok" was pressed for key: ${options.id}`);
});
notifier.on('cancel', (notifierObject, options, event) => {
    console.log(`"Cancel" was pressed for key: ${options.id}`);
    let messageHandler = require('../net/message');
    console.log(messageHandler);
    net.getServer().send(messageHandler.prepMessage({
        action: 'cancel',
        data: {
            id: options.id
        }
    }));
});
notifier.on('answer', (notifierObject, options, event) => {
    console.log(`"Answer" was pressed for key: ${options.key}`);
});

module.exports = {
    handle: (notification) => {
        if (!notification)
            return;

        //TODO handle duplicated by keeping track of notification.id
        let noteObject = Object.assign({
            actions: ['OK', 'Cancel', 'Answer']
        }, notification);

        notifier.notify(noteObject);
    }
};