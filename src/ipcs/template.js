const { remote } = require('electron');


const template = global.share.ipcMain.on('window:minimize', () => {
    window = remote.getCurrentWindow()
    window.blur();
    window.minimize();
});

export default {
    template
}