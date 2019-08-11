// 引入electron并创建一个Browserwindow
const { app, BrowserWindow, globalShortcut, Tray, Menu,ipcMain,dialog} = require('electron')
const path = require('path')
const url = require('url')
// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow
let tray = null;

global.sharedObject = {
  newTel: '000'
}

//设置快捷键
app.on('ready', function () {
  globalShortcut.register('ctrl+alt+o', function () {
  //  mainWindow.webContents.send('main-process-messages', 'StartCapture')
  });
});

function createWindow() {
  //创建浏览器窗口,宽高自定义
  mainWindow = new BrowserWindow({ width: 1024, height: 700, minWidth: 712, minHeight: 505, maximizable: true, icon: '/icon.ico', backgroundColor: '#ffffff', frame: false,show:false
  })
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
     //主进程发送消息给渲染进程
     mainWindow.webContents.send('main-process-messages', 'main-process-messages show')
  }) 
  //加载应用-----  electron-quick-start中默认的加载入口
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  // 打开开发者工具，默认不打开
 mainWindow.webContents.openDevTools();

  mainWindow.setMenu(null)
  // 关闭window时触发下列事件.
  mainWindow.on('closed', function (e) {
    e.preventDefault()
    mainWindow = null
  })  
   //关闭
  mainWindow.on('close', (event) => {
    mainWindow.hide();
    mainWindow.setSkipTaskbar(true);
    event.preventDefault();
  });
  
  //显示
  mainWindow.on('show', () => {
    tray.setHighlightMode('always');
  })
  mainWindow.on('restore', () => {
      tray.setImage(path.join(__dirname, './icon.ico'))
 })
  //隐藏
  mainWindow.on('hide', () => {
    tray.setHighlightMode('always')
  })
//托盘
  tray = new Tray(path.join(__dirname, './icon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出', click: () => {
      mainWindow.webContents.send('main-process-messages', 'exit');
      setTimeout(function () {
         mainWindow.destroy()
      }, 300)
      }
    },
  ])
  tray.setToolTip('测试electron');
  tray.setContextMenu(contextMenu);
  tray.on('click', () => {
        if (mainWindow.isVisible()) {
          if (mainWindow.isMinimized()) {
            mainWindow.show();        
          }
        } else {
          mainWindow.show();
          mainWindow.setSkipTaskbar(false);
        }
      });
    }
//单例进程
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到mainWindow这个窗口
    if (mainWindow) {
      mainWindow.setSkipTaskbar(false);
      mainWindow.show();
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
        mainWindow.focus();
        mainWindow.setSkipTaskbar(false);
      }
    }
  });
}
// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit();

  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})


ipcMain.on('MainMsgFromRender',function (event, arg) {
  console.log(arg)
  event.sender.send('RenderMsgFromMain',arg)
})

ipcMain.on('mainSendMessage',function (event, arg) {
  //主进程发送消息给渲染进程
  mainWindow.webContents.send('main-process-messages', 'main-process-messages show')
})