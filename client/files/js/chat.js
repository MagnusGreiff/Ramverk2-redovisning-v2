/**
 * To setup a websocket connection, and nothing more.
 */

//TODO: Fix wss for localhost or check if url is localhost and change depending if it's true or not.


"use strict";


//TODO: Fix api calls - print result not working

/* eslint-disable no-unused-vars */

const chatFunctions = require('electron').remote.require('./files/js/chatFunctions');

const {
    ipcRenderer
} = require('electron');

const db = require('electron').remote.require('./files/js/database');


let websocket;
let url = document.getElementById("connect_url");
let connect = document.getElementById("connect");
let sendMessage = document.getElementById("send_message");
let message = document.getElementById("message");
let close = document.getElementById("close");
let output = document.getElementById("output");
let connectP = document.getElementById("connect_p");
let disconnectP = document.getElementById("disconnect_p");
let user = document.getElementById("user");
let protocol = document.getElementById("protocol");

/**
 * Log output to web browser.
 *
 * @param  {string} message to output in the browser window.
 *
 * @return {void}
 */
let outputLog = async (text, t = null) => {
    let time;
    let now;
    let timestamp;

    if (t !== null) {
        time = new Date(t);
        timestamp = time.toLocaleTimeString();
    } else {
        now = new Date();
        timestamp = now.toLocaleTimeString();
    }


    let message = await chatFunctions.checkText(text);

    output.innerHTML += `<div class="chat_output">
     <p class="chat_time">${timestamp}</p> <p class="chat_message">${message}</p><br></div>`;
    output.scrollTop = output.scrollHeight;
};


let sendText = async (message, user, connecting, disconnecting) => {
    // Construct a msg object containing the data the
    // server needs to process the message from the chat client.
    let newMessage = message.replace(/\//gi, "%2F").replace(/\[/gi, "%5B").replace(/\]/gi, "%5D");

    let msg = {
        type: "message",
        text: newMessage,
        id: user,
        date: Date.now(),
        connect: connecting,
        disconnect: disconnecting
    };

    /* #TODO: Insert to database */


    // Send the msg object as a JSON-formatted string.
    websocket.send(JSON.stringify(msg));
    await db.dbInsertDataChat(msg);
};


let connectToWebsocket = (url) => {
    if (user.value == "") {
        alert("Username is required");
        return false;
    }

    if (!protocol.value) {
        websocket = new WebSocket(url);
    } else {
        websocket = new WebSocket(url, chatFunctions.setSubProtocol(protocol.value));
    }

    return websocket;
};

let outputToHtml = (text) => {
    output.innerHTML += `<div class="chat_output">
     <p class="chat_message">${text}</p><br></div>`;
    output.scrollTop = output.scrollHeight;
};

/**
 * What to do when user clicks Connect
 */
connect.addEventListener("click", ( /*event*/ ) => {
    websocket = connectToWebsocket(url.value);

    websocket.onopen = async () => {
        output.innerHTML = '';
        /* TODO Change this*/
        let data = await db.dbGetAllDataChat();

        for (let item of data) {
            if (item.disconnect == true || item.connect == true) {
                await outputLog(item.id + item.text, item.date);
            } else {
                await outputLog(item.id + " said: " + item.text, item.date);
            }
        }

        outputLog("You connected to: " + url.value + " as user: " + user.value);
        connectP.style.display = "none";
        disconnectP.style.display = "flex";
        sendText(" connected", user.value, true, false);
        // console.log(data);
        /* #TODO Get all messages from database */
    };

    websocket.onmessage = async (event) => {
        let text = await chatFunctions.checkProtocol(event, protocol.value);

        outputToHtml(text);
    };

    websocket.onclose = () => {
        outputLog("You disconnected from server: " + url.value);
        connectP.style.display = "flex";
        disconnectP.style.display = "none";
    };
}, false);



/**
 * What to do when user clicks enter to send a message.
 */
message.addEventListener("keypress", (e) => {
    let keyCode = e.keyCode;

    if (keyCode == 13) {
        let messageText = message.value;

        if (!websocket || websocket.readyState === 3) {
            return false;
        } else {
            sendText(messageText, user.value, false, false);
            message.value = '';
            outputLog(user.value + " said: " + messageText);
        }
    }
}, false);


sendMessage.addEventListener("click", ( /*event*/ ) => {
    let messageText = message.value;

    if (!websocket || websocket.readyState === 3) {
        return false;
    } else {
        sendText(messageText, user.value, false, false);
        message.value = '';
        outputLog(user.value + " said: " + messageText);
    }
});



/**
 * What to do when user clicks Close connection.
 */
close.addEventListener("click", ( /*event*/ ) => {
    sendText(" disconnected", user.value, false, true);
    websocket.close();
    user.value = "";
    output.innerHTML = '';
    // outputLog("Prepare to close websocket.");
});

require('electron').ipcRenderer.on("connect", ( /*event, message*/ ) => {
    websocket = connectToWebsocket(url.value);

    websocket.onopen = async () => {
        output.innerHTML = '';
        /* TODO Change this*/
        let data = await db.dbGetAllData();

        data.forEach((item) => {
            if (item.disconnect == true || item.connect == true) {
                outputLog(item.id + item.text, item.date);
            } else {
                outputLog(item.id + " said: " + item.text, item.date);
            }
            // sendText(item.text, item.id, item.connect, item.disconnect);
        });

        outputLog("You connected to: " + url.value + " as user: " + user.value);
        connectP.style.display = "none";
        disconnectP.style.display = "flex";
        sendText(" connected", user.value, true, false);
        // console.log(data);
        /* #TODO Get all messages from database */
    };

    websocket.onmessage = (event) => {
        let text = chatFunctions.checkProtocol(event, protocol.value);

        outputToHtml(text);
    };

    websocket.onclose = () => {
        outputLog("You disconnected from server: " + url.value);
        connectP.style.display = "flex";
        disconnectP.style.display = "none";
    };
});

require('electron').ipcRenderer.on('disconnect', ( /*event, message*/ ) => {
    sendText(" disconnected", user.value, false, true);
    websocket.close();
    user.value = "";
    output.innerHTML = '';
});
