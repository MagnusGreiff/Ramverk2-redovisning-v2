"use strict";

const WebSocket = require("ws");

let socket = (server) => {
    const handleProtocols = (protocols /*, request */ ) => {
        console.info(`Incoming protocol requests '${protocols}'.`);
        for (var i = 0; i < protocols.length; i++) {
            if (protocols[i] === "text") {
                return "text";
            } else if (protocols[i] === "json") {
                return "json";
            }
        }
        return false;
    };


    const wss = new WebSocket.Server({
        server: server,
        clientTracking: true, // keep track on connected clients
        handleProtocols: handleProtocols
    });


    wss.broadcastExcept = (ws, data) => {
        let clients = 0;

        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                clients++;
                if (ws.protocol === "json") {
                    let msg = {
                        data: data
                    };

                    client.send(JSON.stringify(msg));
                } else {
                    client.send(data);
                }
            }
        });
        console.info(`Broadcasted data to ${clients} (${wss.clients.size}) clients.`);
    };



    // Setup for websocket requests.
    // Docs: https://github.com/websockets/ws/blob/master/doc/ws.md
    wss.on("connection", (ws /*, req*/ ) => {
        console.info("Connection received. Adding client.");

        // wss.broadcastExcept(ws, `New client connected (${wss.clients.size}).`);

        ws.on("message", (message) => {
            // console.log("Received: %s", message);
            wss.broadcastExcept(ws, message);
        });

        ws.on("error", (error) => {
            console.error(`Server error: ${error}`);
        });

        ws.on("close", (code, reason) => {
            console.info(`Closing connection: ${code} ${reason}`);
            // wss.broadcastExcept(ws, `Client disconnected (${wss.clients.size}).`);
        });
    });
};

module.exports = {
    socket: socket
};
