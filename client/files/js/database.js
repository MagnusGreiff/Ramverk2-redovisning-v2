"use strict";

const fetch = require('node-fetch');

exports.dbGetAllData = async () => {
    return await fetch('http://localhost:3000/db/getAll')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
};

exports.dbGetAllDataChat = async () => {
    return await fetch('http://localhost:3000/db/getAllChat')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
};

exports.dbInsertDataChat = async (data) => {
    let newData = JSON.stringify(data);

    await fetch('http://localhost:3000/db/insertChat/' + newData);
};

exports.dbInsertData = async (data) => {
    let newData = JSON.stringify(data);

    await fetch('http://localhost:3000/db/insert/' + newData);
};

exports.dbRemove = async (id) => {
    await fetch('http://localhost:3000/db/remove/' + id);
};

exports.dbGetOne = async (id) => {
    return await fetch('http://localhost:3000/db/getOne/' + id)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
};

exports.dbUpdate = async (id, data) => {
    let newData = JSON.stringify(data);

    await fetch("http://localhost:3000/db/update/" + id + "/" + newData);
};
