const { app, BrowserWindow, ipcMain, screen, Tray, Menu } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let win;
let tray;

function runPS(args) {
  spawn("powershell", [
    "-NoProfile",
    "-ExecutionPolicy", "Bypass",
    "-File", path.join(__dirname, "mouse.ps1"),
    ...args
  ]);
}

app.whenReady().then(() => {

  const { width, height } = screen.getPrimaryDisplay().size;

  win = new BrowserWindow({
    width,
    height,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    focusable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    }
  });

  win.setIgnoreMouseEvents(true);
  win.loadFile("overlay.html");

  // Tray ikon oluştur
  const iconPath = path.join(__dirname, "icon.png");
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Göster",
      click: () => {
        win.show();
      }
    },
    {
      label: "Gizle",
      click: () => {
        win.hide();
      }
    },
    {
      type: "separator"
    },
    {
      label: "Çık",
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip("Hand Control");

  // Tray tıklaması
  tray.on("click", () => {
    if (win.isVisible()) {
      win.hide();
    } else {
      win.show();
    }
  });

  ipcMain.on("mouse-move", (_, x, y) => {
    runPS(["move", Math.round(x).toString(), Math.round(y).toString()]);
  });

  ipcMain.on("mouse-click", () => {
    runPS(["click"]);
  });

  ipcMain.on("mouse-right-click", () => {
    runPS(["right-click"]);
  });

  ipcMain.on("mouse-scroll", (_, delta) => {
    runPS(["scroll", "0", "0", Math.round(delta).toString()]);
  });

  // Pencere kapatıldığında uygulamayı kapama
  win.on("close", (event) => {
    event.preventDefault();
    win.hide();
  });
});
