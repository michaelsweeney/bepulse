

class FileManager {
    constructor(opts) {
        this.loadbutton = opts.loadbutton
        this.dropzone = opts.dropzone
        this.initListeners();
    }

    initListeners() {
        this.initDrop();
        this.initClick();
    }


    async initDrop() {
        this.dropUI()

        this.dropzone.ondragover = () => { return false; };
        this.dropzone.ondragleave = () => { return false; };
        this.dropzone.ondragend = () => { return false; };

        this.dropzone.ondrop = async (e) => {
            let files  = []
            e.preventDefault();
            for (let f of e.dataTransfer.files) {
                files.push(f.path)
            }
            this.loadFiles(files)
        };
    }

    async loadFiles(files) {
            this.files = files;
            this.checkFileExtensions(files)
            let event = new CustomEvent("fileschanged", {
                bubbles: true, detail: {
                    files: this.files,
                }
            });
            document.dispatchEvent(event)
        }

        
    
    initClick() {
        this.loadbutton.addEventListener('click', (event) => {
            dialog.showOpenDialog({
                properties: ['openFile'],
                filters: [{ name: 'eQUEST Simulation Output', extensions: ['SIM'] }]
            }, async (files) => {
                if (files !== undefined) {
                    this.checkFileExtensions(files)
                }
                this.loadFiles(files)
            });
        });
    }
    


    checkFileExtensions(files) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i]
            let filetype = file.split('.').pop()
            if (filetype.toUpperCase() != 'SIM') {
                alert('Error: Only valid eQUEST .SIM Files allowed')
            }
        }
        return;
    }

    
    dropUI() {
        let _this = this;
        let lastTarget = null;
        window.addEventListener("dragenter", function (e) {
            lastTarget = e.target;
            _this.dropzone.style.visibility = "";
            _this.dropzone.style.opacity = 1;
        });
        window.addEventListener("dragleave", function (e) {
            if (e.target === lastTarget || e.target === document) {
                _this.dropzone.style.visibility = "hidden";
                _this.dropzone.style.opacity = 0;
            }
        });

        window.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        window.addEventListener("drop", function (e) {
            e.preventDefault();
            _this.dropzone.style.visibility = "hidden";
            _this.dropzone.style.opacity = 0;
        });
    }
}



module.exports = {
     FileManager
}