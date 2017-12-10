"use strict";

let submit = document.getElementById("submit");
const db = require('electron').remote.require('./files/js/database');

submit.addEventListener("click", async () => {
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

    await db.dbInsertData(data);
});
