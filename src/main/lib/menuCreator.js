import { app, Menu } from 'electron'

const isMac = process.platform === 'darwin'

const template = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }]
        }
      ]
    : []),
  {
    label: 'PDF',
    submenu: [
      { role: 'reload' },
      {
        label: 'Zoom in',
        accelerator: 'CmdOrCtrl+=',
        click: (menuItem, browserWindow) => {
          console.log('zoom in trigger from menu creator')
          browserWindow.webContents.send('menu-action', 'zoom-in')
        }
      },
      {
        label: 'Zoom out',
        accelerator: 'CmdOrCtrl+_',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('menu-action', 'zoom-out')
        }
      },
      {
        label: 'Reset zoom',
        accelerator: 'CmdOrCtrl+0',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.send('menu-action', 'zoom-reset')
        }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' }, 
      { role: 'forceReload' },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'CmdOrCtrl+Shift+I',
        click: (menuItem, browserWindow) => {
          if (browserWindow) {
            browserWindow.webContents.toggleDevTools()
          }
        }
      }
    ]
  }
]

const mainMenu = Menu.buildFromTemplate(template)

export { mainMenu }
