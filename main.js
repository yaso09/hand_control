const { app, BrowserWindow, ipcMain, screen, Tray, Menu, shell } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const { autoUpdater } = require("electron-updater");

let win;
let tray;
let settingsWin;

// Global ayarlar
let currentSettings = {
  opacity: 100,
  sensitivity: 1.0,
  hand: 'right',
  enableMove: true,
  enableClick: true,
  enableRightClick: true,
  enableScroll: true,
  autoStart: true
};

// --- Persistent Mouse Process ---
let mouseProcess = null;

function startMouseProcess() {
  const scriptPath = app.isPackaged
    ? path.join(path.dirname(app.getPath("exe")), "mouse.ps1")
    : path.join(__dirname, "mouse.ps1");

  mouseProcess = spawn("powershell", [
    "-NoProfile",
    "-ExecutionPolicy", "Bypass",
    "-File", scriptPath
  ]);

  mouseProcess.stdin.setDefaultEncoding('utf-8');

  mouseProcess.on('error', (err) => {
    console.error('Mouse process failed:', err);
  });

  mouseProcess.on('exit', (code, signal) => {
    console.log(`Mouse process exited with code ${code} and signal ${signal}`);
    mouseProcess = null;
  });
}

function runPS(args) {
  if (!mouseProcess) {
    startMouseProcess();
  }

  try {
    const command = args.join(",");
    if (mouseProcess && mouseProcess.stdin) {
      mouseProcess.stdin.write(command + "\n");
    }
  } catch (e) {
    console.error("Error sending command:", e);
  }
}

app.whenReady().then(() => {
  // 1. Start Support Processes
  startMouseProcess();
  autoUpdater.checkForUpdatesAndNotify();

  const { width, height } = screen.getPrimaryDisplay().size;

  // 2. Create Overlay Window
  // Configuration based on working snippet: alwaysOnTop + fullscreen
  win = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    fullscreen: true,
    skipTaskbar: true,
    hasShadow: false,
    // Removed 'type: "toolbar"' and 'show: false' to ensure visibility
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    }
  });

  win.setIgnoreMouseEvents(true, { forward: true });
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  win.loadFile("overlay.html");

  // NOTE: Splash screen logic removed to ensure overlay loads immediately and visibly.
  // User reported overlay not loading with previous complex show/hide logic.

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
      label: "Ayarlar",
      click: () => {
        openSettingsWindow();
      }
    },
    {
      label: "GitHub",
      click: () => {
        shell.openExternal("https://github.com/yaso09/hand_control");
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

  // Overlay'e doğrulamanın başarılı olduğunu bildir (Immediate support)
  if (win && !win.isDestroyed()) {
    win.webContents.on('did-finish-load', () => {
      win.webContents.send("auth-success");
    });
  }

  ipcMain.on("mouse-move", (_, x, y) => {
    if (currentSettings.enableMove) {
      runPS(["move", Math.round(x).toString(), Math.round(y).toString()]);
    }
  });

  ipcMain.on("mouse-click", () => {
    if (currentSettings.enableClick) {
      runPS(["click"]);
    }
  });

  ipcMain.on("mouse-right-click", () => {
    if (currentSettings.enableRightClick) {
      runPS(["right-click"]);
    }
  });

  ipcMain.on("mouse-scroll", (_, delta) => {
    if (currentSettings.enableScroll) {
      runPS(["scroll", Math.round(delta).toString()]);
    }
  });

  // Ayarları kaydet
  ipcMain.handle("save-settings", (_, settings) => {
    currentSettings = { ...currentSettings, ...settings };

    // Overlay'e ayarları gönder
    if (win && !win.isDestroyed()) {
      win.webContents.send("settings-updated", currentSettings);
    }

    return true;
  });

  // Pencere kapatıldığında uygulamayı kapama
  let isQuitting = false;

  app.on("before-quit", () => {
    isQuitting = true;
    if (mouseProcess) {
      mouseProcess.kill();
    }
  });

  win.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault();
      win.hide();
    }
  });
});

function openSettingsWindow() {
  if (settingsWin && !settingsWin.isDestroyed()) {
    settingsWin.focus();
    return;
  }

  // Settings window usually doesn't need to be transparent or always on top
  settingsWin = new BrowserWindow({
    width: 350,
    height: 600,
    frame: false,
    transparent: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    },
    icon: path.join(__dirname, "icon.png")
  });

  settingsWin.loadFile("settings.html");

  settingsWin.on("closed", () => {
    settingsWin = null;
  });
}
