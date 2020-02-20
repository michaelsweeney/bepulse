const { Spinner } = nodeRequire('./assets/js/spinner')
const { FileManager } = nodeRequire('./assets/js/filemgmt')
const { parseSim } = nodeRequire('./assets/js/simparse')
const fs = nodeRequire('fs')

const { ReportSelect } = nodeRequire('./assets/js/reportselect')
const { ReportContent } = nodeRequire('./assets/js/reportcontent')

const { calcPreFontSize } = nodeRequire('./assets/js/sizecalc')

const { globalShortcut } = nodeRequire('electron')


const Store = nodeRequire('electron-store')

class App {

    constructor(props) {
        this.props = props;
        this.store = new Store()



        this.render()
        this.initHandlers()
        this.initListeners()
        this.initKeyStrokes()
        this.initRecentFiles()


    }

    render() {
        this.props.container.innerHTML = `
            
            <div class='dropzone' style="visibility:hidden; opacity:0"></div>

            <div class='progressmodal inactive'></div>

            <div id='main-container'>

              <div class='header'>

                    <div class='header-content'>

                        <div class="dropdown">
                            <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                            <div class="dropdown-menu" aria-labelledby="prev">
                                <a class="dropdown-item recent-files" href="#"></a>
                            </div>
                        </div>                    
              
                      <button type="button" class='load-file-button btn btn-info'>Open File</button>

                        <span class='title'></span>
                        <div class='report-select-container'></div>

                        <button class='report-decrement btn btn-light'><</button>
                        <button class='report-increment btn btn-light'>></button>                
                    
                        <div class='SIM-Name-Container text-info'></div>
                    </div>

              </div>

              <div class='content'>
                <div class='report-content'></div>
              </div>

              <div class='footer'></div>

            </div>
    
            `
    }

    initHandlers() {
        this.spinner = new Spinner({
            container: document.querySelector('.progressmodal')
        })

        this.filemanager = new FileManager({
            dropzone: document.querySelector('.dropzone'),
            loadbutton: document.querySelector('.load-file-button')
        })

        this.reportselect = new ReportSelect({
            container: document.querySelector('.report-select-container')
        })

        this.reportcontent = new ReportContent({
            container: document.querySelector('.report-content')

        })

    }

    watchFiles(files) {
        fs.watchFile(files[0], { interval: 1000 }, () => {
            let r = confirm("SIM file changed. Would you like to reload?");
            if (r == true) {
                this.filemanager.loadFiles(files)
                this.reportcontent.render(_this.content)
            } else {
                return
            }
        })
    }




    initRecentFiles() {
        let files = this.store.get('recentfiles')
        this.props.container.querySelector('.dropdown-menu').innerHTML = files.map((file) => {
            return `<a class='dropdown-item recent-files' href='#'> ${file} </a>`
        }).join('')

    }

    sanitizeRecent(files) {
        let sanitized = []
        files.forEach((file) => {
            let n = file.replace(/\\/g, '/')
            if (!sanitized.includes(n)) {
                sanitized.push(n)
            }
        })
        return sanitized.splice(0, 10)
    }


    initListeners() {
        let _this = this;

        async function changeFiles() {
            let files = event.detail.files
            _this.files = files

            let recent = _this.store.get('recentfiles')
            recent.unshift(files[0])
            recent = _this.sanitizeRecent(recent)

            _this.store.set('recentfiles', recent)

            _this.parsed = await parseSim(files[0])
            _this.watchFiles(files)
            _this.reports = Object.keys(_this.parsed)
            _this.reportselect.updateOptions(Object.keys(_this.parsed))
            _this.reportcontent.clear()
            _this.initRecentFiles()



            // establish defaults
            _this.key = Object.keys(_this.parsed)[0]
            _this.content = Object.values(_this.parsed)[0]



            _this.reportselect.setOption(_this.key)
            _this.reportcontent.render(_this.content)
        }

        function selectReport() {
            _this.key = event.detail.key
            _this.content = _this.parsed[event.detail.key]
            _this.reportcontent.render(_this.content)
        }

        function incrementReport() {
            _this.key = _this.reports[_this.reports.indexOf(_this.key) + 1]
            _this.reportselect.setOption(_this.key)
            _this.content = _this.parsed[_this.key]
            _this.reportcontent.render(_this.content)
        }

        function decrementReport() {
            _this.key = _this.reports[_this.reports.indexOf(_this.key) - 1]
            _this.reportselect.setOption(_this.key)
            _this.content = _this.parsed[_this.key]
            _this.reportcontent.render(_this.content)
        }

        this.props.container.querySelector('.report-increment').addEventListener('click', incrementReport)
        this.props.container.querySelector('.report-decrement').addEventListener('click', decrementReport)


        this.props.container.querySelector('.dropdown').addEventListener('click', () => {
            if (event.target.classList.contains('recent-files')) {
                let file = event.target.innerHTML.trim()
                console.log(file)

                _this.filemanager.loadFiles([file])

            }
        })
        document.addEventListener('fileschanged', changeFiles)
        document.addEventListener('reportselect', selectReport)


        window.addEventListener('resize', () => {
            let sizestyle = calcPreFontSize()
            let pres = _this.reportcontent.props.container.querySelectorAll('pre')
            pres.forEach((pre) => {
                pre.style.fontSize = sizestyle
            })
        })




    }

    initKeyStrokes() {

        window.addEventListener('keyup', () => {
            if (event.key == 'f') {
                $(this.props.container.querySelector('.selectpicker')).selectpicker('toggle')
                event.stopImmediatePropagation()
            }
        })
    }
}









module.exports = {
    App
}