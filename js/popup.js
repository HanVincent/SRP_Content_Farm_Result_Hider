const ACTIONS = { ADD: 1, REMOVE: 2 };
const DEFAULT_BLOCK_LIST = ['read01.com', 'kknews.cc'];

function getElementTemplate(el) {
    return `<li>${el}<span class="close" data-value="${el}"> &times; </span></li>`;
}

// retrieve list from storage and render
function renderList() {
    chrome.storage.sync.get({ blockList: DEFAULT_BLOCK_LIST }, function ({ blockList }) {
        const listString = blockList.map(getElementTemplate).join('');

        document.getElementById('block-list').innerHTML = listString;
    });
}


// update storage list and re-render
function updateStorageList(item, type) {
    if (!item) return;

    chrome.storage.sync.get({ blockList: DEFAULT_BLOCK_LIST }, function ({ blockList }) {

        switch (type) {
            case ACTIONS.ADD:
                if (blockList.includes(item)) return;

                blockList.push(item);
                break;

            case ACTIONS.REMOVE:
                const index = blockList.indexOf(item);
                blockList.splice(index, 1);
                break;
        }

        chrome.storage.sync.set({ blockList }, renderList);
    });
}


window.onload = function () {

    // initialize popup html for the block list
    renderList();

    // add event listener, once the button is clicked, add to the list
    document.getElementById('submit-btn')
        .addEventListener('click', function (event) {
            event.preventDefault();

            const inputBox = document.getElementById('input-box');
            const text = inputBox.value.trim();
            inputBox.value = '';
            updateStorageList(text, ACTIONS.ADD);
        });

    // add event listener, remove the item
    document.getElementById('block-list')
        .addEventListener('click', function (event) {
            updateStorageList(event.target.dataset.value, ACTIONS.REMOVE);
        });
}