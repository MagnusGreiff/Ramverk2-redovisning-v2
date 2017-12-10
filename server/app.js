"use strict";

const express = require('express');
const routes = require('./routes');
const http = require('http');
const errorHandler = require('errorhandler');
const logger = require('morgan');

const app = express();
const server = http.createServer(app);

const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/redovisa";

const socket = require('./src/socket');

socket.socket(server);

// all environments
app.set('port', process.env.DBWEBB_PORT || 3000);
app.use(logger('dev'));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}

app.locals.something = 'value';
app.locals.qaz = 'qut';

app.get('/', routes.index);
app.get('/posts/:id', routes.posts);
app.get('/db/getAll', routes.dbGetAll);
app.get('/db/getAllChat', routes.dbGetAllChat);
app.get('/db/insert/:ob', routes.dbInsert);
app.get("/db/insertChat/:ob", routes.dbInsertChat);
app.get("/db/remove/:id", routes.dbRemove);
app.get("/db/getOne/:id", routes.dbGetOne);
app.get("/db/update/:id/:data", routes.dbUpdate);


app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});


server.listen(app.get('port'), () => {
    console.info('Express server listening on port ' + app.get('port'));
    console.info('DNS is ' + dsn);
});
