"use strict";

/* eslint-disable no-unused-vars */

const {
    app,
    BrowserWindow,
    TouchBar
} = require('electron');

import {
    enableLiveReload
} from 'electron-compile';

const {
    TouchBarLabel,
    TouchBarButton,
    TouchBarSpacer
} = TouchBar;

const path = require('path');
const url = require('url');

let mainWindow;


const disconnect = new TouchBarButton({
    label: '▶️ Disconnect',
    backgroundColor: '#7851A9',
    click: () => {
        mainWindow.webContents.send('disconnect', 'whooooooosh!');
    }
});

const connect = new TouchBarButton({
    label: '⏹ Connect',
    backgroundColor: 'rgb(214, 78, 35)',
    click: () => {
        mainWindow.webContents.send("connect", "whoooooosh!");
    }
});

const touchBar = new TouchBar([
    disconnect,
    new TouchBarSpacer({
        size: 'large'
    }),
    connect,
    new TouchBarSpacer({
        size: 'large'
    })
]);

const open = require("open");

enableLiveReload();

let createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false
    });

    mainWindow.maximize();


    // mainWindow.webContents.loadURL('http://example.com');

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/files/views/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        open(url);
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    mainWindow.setTouchBar(touchBar);
    //


    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    //     app.quit();
    // }
    app.quit();
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
