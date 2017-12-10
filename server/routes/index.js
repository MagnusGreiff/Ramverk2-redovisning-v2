"use strict";

const db = require('../src/database');
const fetch = require('node-fetch');
const token = require("../config/token");

exports.index = (req, res) => {
    (async () => {
        let jsonInfo;
        let key = token.key;
        let url = 'https://api.stackexchange.com/2.2/badges/name?site=stackoverflow&key=' + key;

        await fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                jsonInfo = responseJson;
                console.log(jsonInfo);
                res.json({
                    json: jsonInfo
                });
            })
            .catch((error) => {
                console.error(error);
            });
    })();
};

exports.posts = (req, res) => {
    let postId = req.params.id;
    let filter = 'filter=!9YdnSEPmy';
    let link = 'https://api.stackexchange.com/2.2/posts/';

    try {
        (async () => {
            let jsonInfo;
            let key = token.key;
            let url = link + postId + '?site=stackoverflow&' + filter + '&key=' + key;

            await fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    jsonInfo = responseJson;
                    console.log(jsonInfo);
                    res.json({
                        json: jsonInfo
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
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
}

exports.dbInsert = async (req) => {
    let obj = await req.params.ob;

    console.log(obj);

    await db.insertToCollection(obj, "info");
};

exports.dbInsertChat = async (req) => {
    let obj = await req.params.ob;

    console.log(obj);

    await db.insertToCollection(obj, "chat");
}

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
