function generateVerifyCode(svgElement) {
    const str = 'ABCDEFGHIJKLSTUVWXYZabcdefghijklstuvwxyz0123456789';
    const code = [];
    let htmlstr;
    const svgWidth = svgElement.clientWidth;
    const svgHeight = svgElement.clientHeight;
    const averageWidth = svgWidth / 6;
    const getcode = () => {
        code.length = 0;
        for (let i = 0; i < 4; i++) {
            code.push(str[getRandom(0, str.length - 1)]);
        }
    }
    const rendersvg = () => {
        getcode();
        htmlstr = code.map((item, index) => `<text x="${(index + 1) * averageWidth}" y="${getRandom(30, svgHeight - 30)}" transform="rotate( ${getRandom(-30, 30)}, ${(index + 1) * averageWidth}, ${svgHeight / 2})" style="font-size: 20px;" fill="rgb(${getRandom(0, 120)}, ${getRandom(150, 120)}, ${getRandom(150, 120)})">${item}</text>`);
        for (let i = 0; i < 6; i++) {
            htmlstr.push(`<line x1="${getRandom(0, svgWidth)}" y1="0" x2="${getRandom(0, svgWidth)}" y2=${svgHeight} style="stroke:rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)});stroke-width:1"/>`);
        }
        const svghtml = htmlstr.join('');
        svgElement.innerHTML = svghtml;
        htmlstr.length = 0;
    }
    rendersvg();
    svgElement.addEventListener('click', function () {
        rendersvg();
    });
    return function (value) {
        value = value.trim();
        if(value.length === 4){
           const state = value.split('').every((item, index) => item.toLowerCase() == code[index].toLowerCase())
            if (!state) {
                rendersvg();
                return '验证码填写不正确';
            }
        }else{
            rendersvg();
            return '验证码填写不正确';
        }
        
    }
}
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}
function getFileURL(file) {
    var getUrl = null;
    if (window.createObjectURL != undefined) { // basic
        getUrl = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        getUrl = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        getUrl = window.webkitURL.createObjectURL(file);
    }
    return getUrl;
}
