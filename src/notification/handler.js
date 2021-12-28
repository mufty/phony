const notifier = require('node-notifier');

module.exports = {
    handle: (notification) => {
        if (!notification)
            return;

        notifier.notify(notification);
    }
};