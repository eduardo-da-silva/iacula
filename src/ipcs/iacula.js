const iacula = global.share.ipcMain.on('getImages', (e, dayOfWeek) => {
    const fs = require("fs");
    const path = require("path");
    const relDir = `assets/images/iacula/${dayOfWeek}/`
    const imagesDir = path.join(__static, relDir);
    const files = fs.readdirSync(imagesDir);
    const chosenFile = files[Math.floor(Math.random() * files.length)];
    e.returnValue = relDir + chosenFile
})

export default {
    iacula
}