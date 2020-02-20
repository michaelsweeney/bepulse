
"use strict";

const electron = require('electron')
const app = electron.app

const dialog = electron.dialog
const BrowserWindow = electron.BrowserWindow
const { ipcMain } = require('electron')

const url = require('url')
const path = require('path')

// require('electron-reload')(__dirname)

let win;

function createWindow() {

  win = new BrowserWindow({
    // titleBarStyle: 'hidden',
    frame: false,
    width: 1200,
    height: 800,
    minWidth: 400,
    minHeight: 400,
    webPreferences: {
      nodeIntegration: true
    },
  })
  win.setMenu(null);

  win.webContents.loadFile(path.join(__dirname, "index.html"))

  win.webContents.openDevTools();
  win.loadURL(`file://${__dirname}/index.html`);
}




ipcMain.on('ondragstart', (event, filePath) => {

  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})





app.on('ready', createWindow)


