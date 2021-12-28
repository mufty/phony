const notification = require('../notification/handler');

const ACTION_NOTIFICATION = "notification";

module.exports = {
    handle: (msg) => {
        if (!msg || !msg.action || !msg.data)
            return;

        let data = JSON.parse(msg.data);

        switch (msg.action) {
            case ACTION_NOTIFICATION:
                notification.handle(data);
                break;
            default:
                break;
        }
    },
    prepMessage: (msg) => {
        if (!msg || !msg.action || !msg.data)
            return;

        let dataStr = JSON.stringify(msg.data);
        msg.data = dataStr;

        return JSON.stringify(msg);
    }
};