const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  dockerPS: () => ipcRenderer.send("docker-ps"),
  onDockerPS: (callback) => ipcRenderer.on("docker-ps", callback),
});
