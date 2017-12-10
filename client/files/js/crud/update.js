"use strict";

/* eslint-disable no-unused-vars */


const db = require('electron').remote.require('./files/js/database');

let update = document.getElementById("update");

let urlString = document.URL; //window.location.href
let url = new URL(urlString);
let id = url.searchParams.get('id');

let newId = id.replace('"', "'");

let getData = async (id) => {
    console.log("Id Inside getData " + id);
    let information = await db.dbGetOne(id);

    console.log("Inside getData");
    // console.log(information[0]);

    return information[0];
};

let meh = async (id) => {
    let data = await getData(id);

    let getName = document.getElementById("name").value = data.name;
    let getAge = document.getElementById("age").value = data.age;
    let getPob = document.getElementById("pob").value = data.current_place;
    let getCurp = document.getElementById("curp").value = data.place_of_birth;
};

meh(newId);

update.addEventListener("click", async () => {
    let getName = document.getElementById("name").value;
    let getAge = document.getElementById("age").value;
    let getPob = document.getElementById("pob").value;
    let getCurp = document.getElementById("curp").value;

    let data = {
        "name": getName,
        "age": getAge,
        "place_of_birth": getPob,
        "current_place": getCurp
    };

    console.log(data);

    await db.dbUpdate(newId, data);


    console.log("clicked");
    //
    // window.location = "read.html";
});
