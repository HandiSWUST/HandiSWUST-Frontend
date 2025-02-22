export function setAcgTheme(el) {
    let acgMode = localStorage.getItem('ACG_MODE') === 'true';
    if (acgMode) {
        let custBg = localStorage.getItem('customBg');
        if (custBg !== "" && custBg != null) {
            el.style.cssText += `background-image: url("${custBg}");`
        } else {
            let bgUrl = localStorage.getItem("ramdonBg");
            el.style.cssText += `background-image: url("${bgUrl}");`;
        }
        el.style.cssText += "background-position: center;" + "background-repeat: no-repeat;" + "background-size: cover;"
    }
}