function getTemplate(href) {
    const hostname = new URL(href).hostname;
    return `<div><h1 style="text-align: center;"> ${hostname} 已被隱藏！</h1></div>`;
}


function removeResults(blockList) {
    const results = document.querySelectorAll('.srg .g');

    results.forEach(result => {
        const href = result.querySelector('.rc .r a').href;
        const hostname = new URL(href).hostname;

        for (let each of blockList) {
            if (hostname.includes(each)) {
                result.innerHTML = getTemplate(href);
                break;
            }
        }
    });
}


chrome.storage.sync.get('blockList', function ({ blockList }) {
    removeResults(blockList);
});
