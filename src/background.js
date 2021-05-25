'use strict'

import { app, protocol, BrowserWindow, Tray, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
import config from './config'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const iconPath = path.join(__static, 'assets/pray.png')
const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Sair', click: () => {
      app.isQuiting = true
      app.quit()
    }
  },
  {
    label: 'Configurações', click: () => {
      navigate({ name: 'Settings' })
    }
  }
])



let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? process.env.WEBPACK_DEV_SERVER_URL
  : `file://${__dirname}/index.html`
let tray = null

async function createWindow() {
  const iconApp = path.join(__static, 'assets/pray.png')

  let { width, height } = config.get('windowBounds');

  mainWindow = new BrowserWindow({
    frame: true,
    transparent: true,
    width: width,
    height: height,
    icon: iconApp,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  tray = new Tray(iconPath)
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
  tray.setContextMenu(contextMenu)

  mainWindow.on('minimize', (e) => {
    e.preventDefault()
    mainWindow.hide()
  })

  mainWindow.on('show', () => {
    tray.setToolTip('always')
  })

  mainWindow.on('hide', () => {
    tray.setToolTip('never')
  })

  mainWindow.on('resize', () => {
    let { width, height } = mainWindow.getBounds();
    config.set('windowBounds', { width, height });
  });

  if (!process.env.WEBPACK_DEV_SERVER_URL) {
    createProtocol('app')
    mainWindow.setMenu(null)
  }
  await mainWindow.loadURL(winURL)
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

if (isDevelopment) {
  process.on('SIGTERM', () => {
    app.quit()
  })
}

//  IPCs settings
global.share = { ipcMain }
require('./ipcs')

ipcMain.on('window:minimize', () => {
  mainWindow.minimize();
});

ipcMain.on('window:maximize', () => {
  mainWindow.restore();
});


function navigate(routePath) {
  if (mainWindow.webContents) {
    mainWindow.webContents.send('navigate', routePath)
  }
}