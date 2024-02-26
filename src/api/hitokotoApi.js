export function hitokoto(type, encode) {
    return fetch("/api/hitokoto?c=" + type + "&encode=" + encode)
        .then(response => response.json())
        .catch(e => {
            console.log("Oops, error", e);
        });
}