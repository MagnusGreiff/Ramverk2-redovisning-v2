"use strict";

const fetch = require('node-fetch');

exports.getInformation = async (postId) => {
    return await fetch('http://localhost:3000/posts/' + postId)
        .then((response) => response.json())
        .then((responseJson) => {
            let jsonInfo = responseJson.json;
            let information;

            try {
                let info = {
                    title: jsonInfo.items[0].title,
                    link: jsonInfo.items[0].link
                };

                information = info;
            } catch (e) {
                console.error('\x1b[41m', 'Undefined map item', '\x1b[0m');
            }
            // console.log("outsude");
            // console.log(information);
            return information;
        })
        .catch((error) => {
            console.error(error);
        });
};
