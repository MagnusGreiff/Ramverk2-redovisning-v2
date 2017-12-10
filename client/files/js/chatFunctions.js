"use strict";

const api = require('./api');

let checkProtocol = async (event, protocol) => {
    let msg;
    let parsedMsg;
    let time;
    let timeStr;
    let connecting;
    let disconnecting;
    let id;
    let text;

    if (protocol == "json") {
        msg = JSON.parse(event.data);
        parsedMsg = JSON.parse(msg.data);
        time = new Date(parsedMsg.date);
        timeStr = time.toLocaleTimeString();
        connecting = parsedMsg.connect;
        disconnecting = parsedMsg.disconnect;
        id = parsedMsg.id;
        text = await checkText(parsedMsg.text);
    } else {
        msg = JSON.parse(event.data);
        time = new Date(msg.date);
        timeStr = time.toLocaleTimeString();
        connecting = msg.connect;
        disconnecting = msg.disconnect;
        id = msg.id;
        text = await checkText(msg.text);
    }


    if (connecting) {
        text = "(" + timeStr + ") " + id + text;
    } else if (disconnecting) {
        text = "(" + timeStr + ") <b>" + id + text + "</b>";
    } else {
        text = "(" + timeStr + ") <b>" + id + " said</b>: " + text + "<br>";
    }

    return text;
};

let checkText = async (text) => {
    let re = new RegExp(/\[post\](\d+)\[\/post\]/g);
    let match = re.exec(text);

    while (match !== null) {
        let getInformation = await api.getInformation(match[1]);

        text = text.replace('[post]' + match[1] + '[/post]', "<a href='" +
            getInformation.link + "' target='_blank'>" +
            getInformation.title + "</a>");
        match = await re.exec(text);
    }
    return text;
};

let setSubProtocol = (protocol) => {
    return protocol;
};

module.exports = {
    checkText: checkText,
    setSubProtocol: setSubProtocol,
    checkProtocol: checkProtocol
};
