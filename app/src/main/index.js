'use strict'

import {app, BrowserWindow} from 'electron'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${require('../../../config').port}`
    : `file://${__dirname}/index.html`

function createWindow() {
    // var subpy = require('child_process').spawn('python3', ['./main.py'],{cwd:require('path').join(__dirname,'../../../python/api/')});
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // eslint-disable-next-line no-console
    console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
