"use strict";

const dsn = process.env.DBWEBB_DSN || "mongodb://localhost:27017/redovisa";
const mongo = require("mongodb").MongoClient;
const ObjectId = require('mongodb').ObjectID;

let findInCollection = async (colName, criteria, projection, limit, sort) => {
    const db = await mongo.connect(dsn);
    const col = await db.collection(colName);
    const res = await col.find(criteria, projection).limit(limit).sort(sort).toArray();

    await db.close();

    return res;
};

let insertToCollection = async (obj, colName) => {
    const db = await mongo.connect(dsn);
    const col = await db.collection(colName);

    let ob = JSON.parse(obj);
    const insert = await col.insert(ob);

    return insert;
};

let removeFromCollection = async (id) => {
    const db = await mongo.connect(dsn);
    const col = await db.collection("info");

    await col.deleteOne({_id: ObjectId(id)});
};

let findOneInCollection = async (id) => {
    const db = await mongo.connect(dsn);
    const col = await db.collection("info");
    const res = await col.find({_id: ObjectId(id)}).limit(1).toArray();

    await db.close();

    return res;
};

let updateCollection = async (id, data) => {
    const db = await mongo.connect(dsn);
    const col = await db.collection("info");

    let newData = JSON.parse(data);

    await col.update({_id: ObjectId(id) }, newData);
};

module.exports = {
    findInCollection: findInCollection,
    insertToCollection: insertToCollection,
    removeFromCollection: removeFromCollection,
    findOneInCollection: findOneInCollection,
    updateCollection: updateCollection
};
