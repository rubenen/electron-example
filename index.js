const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("docker-ps", (event, title) => {
    spawnDocker(win);
    console.log("fired from dom");
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});

const spawnDocker = (win) => {
  let spawn = require("child_process").spawn;

  let bat = spawn("docker", ["ps"]);
  let dockerOutput = "";

  bat.stdout.on("data", (data) => {
    const buffer = Buffer.from(data);
    dockerOutput = dockerOutput + buffer.toString();
  });

  bat.on("exit", (code) => {
    console.log(dockerOutput);
    win.webContents.send("docker-ps", { dockerps: dockerOutput });
  });
};
