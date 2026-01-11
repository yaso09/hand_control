const { app, BrowserWindow, ipcMain, screen } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let win;

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
});
