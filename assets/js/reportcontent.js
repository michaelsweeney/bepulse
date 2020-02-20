const { calcPreFontSize } = nodeRequire('./assets/js/sizecalc')




class ReportContent {
    constructor(props) {
        this.props = props;
    }
    clear() {
        this.props.container.innerHTML = ''
    }

    render(content) {


        let size = calcPreFontSize()

        let filterout = [
            'DOE-2',
            'WEATHER FILE-',
            '---------------------------------------------------------------------------------------------------------------------------------',
            '\\(CONTINUED\\)--'
        ]


        let markup = content.splice(0,content.length-2).map((line) => {

            if (line == '') {
                return `<div class='br'></div>`
            }

            else {
                return `
                    <pre style="font-size: ${size}">${line}</pre>
                    `
            }

        }).join('')

        if (markup.length > 45000000) {
            alert('ERROR: CONTENT TOO LARGE TO SHOW. SHOWING FIRST 1,000,000 CHARACTERS...')
            this.props.container.innerHTML = markup.substring(0,1000000)    
            return
        }




        this.props.container.innerHTML = markup
    }
}


module.exports = {
    ReportContent
}



// let linefilters = [
//     'DOE-2',
//     'BDL RUN',
//     'REPORT- ',
//     'WEATHER FILE-',
//     '--\\(CONTINUED\\)--',
// ]


// if (line.includes('DOE-2.') && line.includes('BDL RUN')) {
//     header = line.split('\f')[1]
// }
// if (new RegExp(parsers.join("|")).test(line)) {
//     currentreport = line.replace('REPORT-', '').split("WEATHER FILE")[0].trim()
// }