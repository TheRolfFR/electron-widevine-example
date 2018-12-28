// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      plugins: true,
      nodeIntegration: false
    }
  })
  mainWindow.webContents.openDevTools()

  //mainWindow.loadURL('https://demo.castlabs.com/')
  mainWindow.loadURL('https://bitmovin.com/demos/drm')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

app.on('widevine-ready', (version) => {
  console.log('Widevine ' + version + ' is ready to be used!');
  createWindow()
});
app.on('widevine-update-pending', (currentVersion, pendingVersion) => {
  console.log('Widevine ' + currentVersion + ' is ready to be upgraded to ' + pendingVersion + '!');
});
app.on('widevine-error', (error) => {
  console.log('Widevine installation encounterted an error: ' + error);
  //process.exit(1)
});