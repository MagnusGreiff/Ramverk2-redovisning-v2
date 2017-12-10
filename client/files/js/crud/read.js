"use strict";

const db = require('electron').remote.require('./files/js/database');
// const chatFunctions = require('electron').remote.require('./files/js/chatFunctions');

let dbContent = document.getElementById("dbContent");

let outputLog = async (text) => {
    let id = text._id;

    let msg = {
        "namn": text.name,
        "age": text.age,
        "place_of_birth": text.place_of_birth,
        "current_place": text.current_place
    };

    let message = JSON.stringify(msg);


    // let message = await chatFunctions.checkText(text);

    dbContent.innerHTML += `<div class="chat_output">
    <p class="chat_message">${message}</p><a href="delete.html?id=${id}">Delete</a>
    <a href="update.html?id=${id}">Update</a></div>`;
    dbContent.scrollTop = dbContent.scrollHeight;
};

let getData = async () => {
    let data = await db.dbGetAllData();

    for (let item of data) {
        await outputLog(item);
    }
};

getData();
