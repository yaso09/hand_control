# 🎮 Hand Control

> Modern Electron application for mouse control using hand gestures.

[![Platform](https://img.shields.io/badge/Platform-Windows-blue?style=flat-square)](https://www.microsoft.com/windows/)
[![Node](https://img.shields.io/badge/Node.js-Required-green?style=flat-square)](https://nodejs.org/)
[![Electron](https://img.shields.io/badge/Electron-Powered-9cf?style=flat-square)](https://www.electronjs.org/)

---

## ✨ Features

- 🖱️ **Hand Gesture Control** — Control your mouse through hand movements via camera
- ⚡ **Fast Performance** — Electron-based optimal user experience
- 📦 **Packaged Distribution** — Windows installer support
- 🔧 **Easy Setup** — Get started with simple commands

---

## 🚀 Quick Start

### Requirements

- **Node.js** and **npm**
- **Windows** operating system

### Installation & Running

```powershell
# Install dependencies
npm install

# Run in development mode
npm start
```

---

## 📦 Building & Packaging

To package the application for Windows:

```powershell
npm run build
```

### Creating NSIS Installer

To create an installer (.exe), you must have **NSIS** installed on your system:

🔗 **Download:** [NSIS Official Page](https://nsis.sourceforge.io/Download)

---

## 📁 Project Structure

| File | Description |
|------|-------------|
| `main.js` | Main Electron process |
| `preload.js` | Preload script |
| `overlay.html` | User interface |
| `mouse.ps1` | PowerShell mouse control script |
| `package.json` | Project dependencies and configuration |

---

## 🔧 Troubleshooting

### "File is being used by another process" Error

If you encounter this error during build:

1. Close any running `electron` or `node` processes
2. Delete the `dist` folder
3. Run `npm run build` again

### Electron Version Issue

To explicitly specify the Electron version:

```powershell
npm install --save-dev electron@28.3.3
```

---

## 📖 User Guide

### Getting Started

1. After launching the application, you will see an icon in the **system tray** (bottom-right corner)
2. Click the tray icon to toggle the overlay window visibility
3. Your camera will activate and begin detecting hand gestures

### Hand Gestures

#### **Right Hand — Mouse Movement**
- **Activation:** Make a **clutch gesture** with your right hand (hold thumb to other fingers)
- **Movement:** Release the clutch and move your hand — the mouse cursor will follow
- **Reset:** Make the clutch gesture again to reset the reference point

#### **Left Hand — Clicking & Scrolling**

**Left Click:**
- **Pinch** your thumb and middle finger quickly and release immediately
- A left mouse click will be sent

**Right Click:**
- **Pinch** your thumb and middle finger and **hold for ~550ms**
- Then release — a right mouse click will be performed

**Scrolling:**
- Make a **fist** with your left hand (close all fingers)
- Move your hand **up or down** — the page will scroll accordingly

### Settings & Parameters

| Parameter | Description | Default Value |
|-----------|-------------|----------------|
| `SMOOTHING` | Cursor movement smoothing | 0.15 |
| `GAIN` | Mouse sensitivity (higher = faster) | 2.8 |
| `RIGHT_CLICK_THRESHOLD` | Hold time for right-click (ms) | 550 |
| `SCROLL_GAIN` | Scroll speed multiplier | 0.6 |
| `SCROLL_DEADZONE` | Minimum finger movement for scroll | 10 |

You can adjust these values in the `PARAMS` section of **overlay.html**.

### Tray Menu Options

- **Show** — Displays the overlay window
- **Hide** — Hides the overlay window (app continues running)
- **Quit** — Closes the application

---
## 👤 Developer

Developed by **Yasir**.
