const { app, BrowserWindow, globalShortcut } = require('electron')
//const config = require('./config')

let win = null, contents = null;

function createWindow () {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //win.loadURL(config.url)
   win.loadFile('index.html')

  contents = win.webContents
}

function toggleDevTools() {
  contents.toggleDevTools()
}

function createShortcuts() {
    globalShortcut.register('CmdOrCtrl+J', toggleDevTools)
}

app.whenReady().then(() => {
  createWindow()
  createShortcuts()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})