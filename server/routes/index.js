"use strict";

const db = require('../src/database');
const fetch = require('node-fetch');

let checkApiToken = (validPath, unvalidPath) => {
    let token;

    try {
        token = require(validPath);
        console.info("\x1b[32m",
            "You are using token.json and can now do api request if your key is valid.");
        console.info("\x1b[0m");
    } catch (e) {
        console.warn("\x1b[33m",
            "You are using example-token.json. You need to add your own key to token.json.");
        console.warn("The server will start and you can only do x amounts of requests.");
        console.info("\x1b[0m");
        token = require(unvalidPath);
    }
    return token;
};

const token = checkApiToken("../config/token", "../config/example-token.json");


let makeRequest = async (url, res) => {
    await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            let jsonInfo = responseJson;
            res.json({
                json: jsonInfo
            });
        })
        .catch((error) => {
            console.error(error);
        });
};


exports.index = (req, res) => {
    (async () => {
        let jsonInfo;
        let key = token.key;
        let link = 'https://api.stackexchange.com/2.2/badges/name';

        let type = token.type;
        let url;

        if (type == "public") {
            url = link + '?site=stackoverflow';
        } else if (type == "private") {
            url = link + '?site=stackoverflow' + '&key=' + key;
        }

        makeRequest(url, res);
    })();
};

exports.posts = (req, res) => {
    let postId = req.params.id;
    let filter = 'filter=!9YdnSEPmy';
    let link = 'https://api.stackexchange.com/2.2/posts/';

    try {
        (async () => {
            let key = token.key;
            let type = token.type;
            let url;

            if (type == "public") {
                url = link + postId + '?site=stackoverflow&' + filter;
            } else if (type == "private") {
                url = link + postId + '?site=stackoverflow&' + filter + '&key=' + key;
            }

            makeRequest(url, res);
        })();
    } catch (e) {
        console.log(e);
    }
};

exports.dbGetAll = async (req, res) => {
    try {
        let data = await db.findInCollection("info", {}, {}, 0, {});

        res.json(data);
        // res.send(res);
    } catch (err) {
        console.error(err);
    }
};

exports.dbGetAllChat = async (req, res) => {
    try {
        let data = await db.findInCollection("chat", {}, {}, 0, {});

        res.json(data);
        // res.send(res);
    } catch (err) {
        console.error(err);
    }
};

exports.dbInsert = async (req) => {
    let obj = await req.params.ob;

    console.log(obj);

    await db.insertToCollection(obj, "info");
};

exports.dbInsertChat = async (req) => {
    let obj = await req.params.ob;

    console.log(obj);

    await db.insertToCollection(obj, "chat");
};

exports.dbRemove = async (req) => {
    let id = await req.params.id;

    await db.removeFromCollection(id);
};

exports.dbGetOne = async (req, res) => {
    try {
        let id = await req.params.id;

        console.log("Inside try catch");

        let data = await db.findOneInCollection(id);

        // console.log(data);

        res.json(data);
    } catch (err) {
        console.error(err);
    }
};

exports.dbUpdate = async (req) => {
    let id = req.params.id;
    let data = req.params.data;

    await db.updateCollection(id, data);
};
