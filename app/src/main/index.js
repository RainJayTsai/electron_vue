'use strict'
// var psTree = require('ps-tree')
import {app, BrowserWindow} from 'electron'
// var remote = require('electron').remote;


let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${require('../../../config').port}`
    : `file://${__dirname}/index.html`

const path = require('path')
const child_process = require('child_process')
function createWindow() {
    // var subpy = require('child_process').spawn('python3', ['./main.py'],{cwd:require('path').join(__dirname,'../../../pp/api/')});
    // var subpy = require('child_process').spawn('python', [path.join(__dirname, '../../app.asar.unpacked/pp', 'hello.py' )]);

    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    })

    // mainWindow.webContents.openDevTools()

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        console.log("Closed")
        mainWindow = null
    })

    // eslint-disable-next-line no-console
    console.log('mainWindow opened')
}
let subpy = null
var os = require('os')
const createPyProc = () => {
    if (os.platform() == 'win32') {
        if (subpy == null) {
            if (process.env.NODE_ENV === 'development') {
                subpy = require('child_process').spawn(path.join(__dirname, '../../pp', 'main.exe'), {detached: false});
            } else {
                subpy = child_process.execFile(path.join(__dirname, '../../app.asar.unpacked/pp', 'main.exe'), {
                    detached: false,
                    stdio: 'ignore'
                });
            }
            console.log(subpy.pid)

        }
    }
}


const exitPyProc = () => {
    if( os.platform() == 'win32'){
        console.log("FCUKED")
        console.log("PID " + subpy.pid)
        // child_process.exec('TASKKILL /pid ' + subpy.pid + ' /T /F' )
        // child_process.exec('TASKKILL /F /IM main.exe /T' )
        child_process.execSync('TASKKILL /pid ' + subpy.pid + ' /T /F', (error, stdout, stderr) =>{
            if (error) {
                console.error(`exec error: ${error}`);
                return;
              }
              console.log(`stdout: ${stdout}`);
              console.log(`stderr: ${stderr}`);

        } )
    }
    else{
        console.log("Fucking")
        if(subpy){
            subpy.kill('SIGINT')
        }
    }
}

app.on('ready', createWindow)
app.on('ready', createPyProc)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log("all-closed")
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

app.on('will-quit', ()=>{
    console.log("will-quit")
    exitPyProc()
})