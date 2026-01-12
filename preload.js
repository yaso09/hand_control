const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipc", {
  send: (channel, ...args) => {
    ipcRenderer.send(channel, ...args);
  }
});
contextBridge.exposeInMainWorld("electronAPI", {
  ipcRenderer: {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    on: (channel, callback) => ipcRenderer.on(channel, callback),
    send: (channel, ...args) => ipcRenderer.send(channel, ...args)
  }
});