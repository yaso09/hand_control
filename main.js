const { app, BrowserWindow, ipcMain, screen, Tray, Menu, shell } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let win;
let tray;
let splashWin;
let settingsWin;
let loginWin;
let isLoggedIn = false;

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
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    fullscreenable: false,
    focusable: true,
    skipTaskbar: true,
    hasShadow: false,
    type: "splash",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    }
  });

  win.setIgnoreMouseEvents(true);
  win.setAlwaysOnTop(true, "pop-up-menu", 1);
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  win.loadFile("overlay.html");
  win.hide(); // Başlangıçta gizle, login başarılı olunca göster

  // Overlay yüklendikten sonra splash screen'i kapat
  win.once("ready-to-show", () => {
    // Burada gösterilmeyecek, login başarılı olunca gösterilecek
  });


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

  if (!splashWin || splashWin.isDestroyed()) {
      splashWin = new BrowserWindow({
        width: 500,
        height: 600,
        frame: false,
        transparent: false,
        alwaysOnTop: true,
        center: true,
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true
        }
      });
      splashWin.loadFile("splash.html");
    }
    
    splashWin.show();
    
    // 2 saniye sonra splash'i kapat ve overlay'i göster
    setTimeout(() => {
      if (splashWin && !splashWin.isDestroyed()) {
        splashWin.close();
      }
      if (win && !win.isDestroyed()) {
        win.showInactive();
        win.moveTop();
      }
    }, 2000);
    
    // Overlay'e doğrulamanın başarılı olduğunu bildir
    if (win && !win.isDestroyed()) {
      win.webContents.send("auth-success");
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
      runPS(["scroll", "0", "0", Math.round(delta).toString()]);
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
