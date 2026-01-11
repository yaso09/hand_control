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

## 👤 Developer

Developed by **Yasir**.
