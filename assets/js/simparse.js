


const parseSim = async function (file) {
    let reports = {}
    let asstring = await d3.text(file)
    let content = asstring.split('\r\n')
    let header;
    let currentreport;


    let parsers = [
        'Summary for',
        'Energy Usage for',
        'Summary of',
        'Energy Use for',
        'Peak Load Components',
        'System Design Parameters for'
    ]



    content.forEach((line) => {

        if (line.includes('DOE-2.') && line.includes('BDL RUN')) {
            header = line.split('\f')[1]
        }

        if (line.includes('REPORT-') && (!line.includes('HOURLY'))) {
            
            if (new RegExp(parsers.join("|")).test(line)) {
                currentreport = line.replace('REPORT-', '').split("WEATHER FILE")[0].trim().replace(/\s\s+/g, ' ');
            }
            
            else {
                currentreport = line.replace('REPORT-', '').split('  ')[0].trim().replace(/\s\s+/g, ' ');
            }
        }

        if (currentreport in reports) {

                reports[currentreport].push(line)
            
            
            
        }
        else {
            reports[currentreport] = [header, line]
        }
    })

    // reorder alphabetically
    const ordered = {};
    Object.keys(reports).sort().forEach(function (key) {
        ordered[key] = reports[key];
    });
    return ordered;
}




module.exports = { parseSim }