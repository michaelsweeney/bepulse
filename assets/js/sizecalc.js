function calcPreFontSize() {
    let numchars = 130;
    let mod = 1.6
    let maxsize = 14
    let textsize = (window.innerWidth / numchars) * mod
    let sizestyle = Math.min(textsize, maxsize) + 'px'
    return sizestyle
}


module.exports = {
    calcPreFontSize
}