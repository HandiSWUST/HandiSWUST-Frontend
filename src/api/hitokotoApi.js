export function hitokoto(type, encode) {
    return fetch("http://8.137.92.6:8000/?c=" + type + "&encode=" + encode)
        .then(response => response.json())
        .catch(e => {
            console.log("Oops, error", e);
        });
}
