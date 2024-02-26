export function hitokoto(type, encode) {
    return fetch("https://v1.hitokoto.cn?c=" + type + "&encode=" + encode)
        .then(response => response.json())
        .catch(e => {
            console.log("Oops, error", e);
        });
}