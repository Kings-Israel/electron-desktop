const {BrowserWindow} = require('electron')

//Offscreen BrowserWindow
let offScreenWindow

//Export readItem Function
module.exports = (url, callback) => {
    offScreenWindow = new BrowserWindow({
        width: 500,
        height: 500,
        show: false,
        webPreferences: {
            offscreen: true
        }
    })

    //Load items url
    offScreenWindow.loadURL(url)

    //Wait for content to finish loading
    offScreenWindow.webContents.on('did-finish-load', e => {
        //Get page title
        let title = offScreenWindow.getTitle()

        //Get screen shot
        offScreenWindow.webContents.capturePage(image => {
            let screenshot = image.toDataURL()

            //Execute callback function
            callback({title, screenshot, url})

            //Clean up
            offScreenWindow.close()
            offScreenWindow = null
        })
    })
}

