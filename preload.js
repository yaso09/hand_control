const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipc", {
  send: (channel, ...args) => {
    ipcRenderer.send(channel, ...args);
  }
});
