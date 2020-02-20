const { dialog } = nodeRequire('electron').remote
const glob = nodeRequire('glob');
const fs = nodeRequire('fs');
const { ipcRenderer } = nodeRequire('electron')
const {App} = nodeRequire('./assets/js/app')

const customTitlebar = nodeRequire('custom-electron-titlebar');
 

$(document).ready( () => {


    const title = new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#ffffff'),
    });

    let app = new App({
        container: document.querySelector('#app-entry')
    })

    let simfile1 = './assets/geo.SIM'
    let simfile2 = './assets/noerv.SIM'

    // app.filemanager.loadFiles([simfile1])

    document.addEventListener('fileschanged', () => {
        let simname = event.detail.files[0].replace(/\\/g, '/').split('/').splice(-1)
        console.log(simname)
        document.title = `bepulse - ${simname}`
        title.updateTitle()
    })

    // app.filemanager.loadFiles([simfile2])

    // let towatch = 'P:/_Projects/B160000/B160234-000/D-Design Mgmt/Calc/Energy/Energy Model/Congress Street Model/2018-09-10 Glass Area/Proposed/Congress St Prop Autosize - 1.SIM'

    // fs.watchFile(towatch, { interval: 1000 }, () => alert('file changed'))


})





























