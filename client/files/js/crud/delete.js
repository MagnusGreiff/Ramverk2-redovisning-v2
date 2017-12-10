"use strict";

const db = require('electron').remote.require('./files/js/database');

let urlString = document.URL; //window.location.href
let url = new URL(urlString);
let id = url.searchParams.get('id');

let newId = id.replace('"', "'");

db.dbRemove(newId);

window.location = "read.html";
