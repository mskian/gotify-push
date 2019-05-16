function saveOptions() {
    const apiurl = document.getElementById('apiurl').value
    chrome.storage.sync.set({
        apiurl
    }, () => {
        restoreOptions();
        const apiurl = document.getElementById('save');
        apiurl.textContent = 'Saved.';
        setTimeout(() => {
            apiurl.textContent = 'Save';
        }, 1000);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        apiurl: []
    }, result => {
        if (document.getElementById('apiurl') != null) {
            document.getElementById('apiurl').value = result.apiurl;
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
var el = document.getElementById('save');
if (el) {
    el.addEventListener('click', saveOptions);
}
var gc = document.getElementById('form');
if (gc) {
    gc.addEventListener('submit', ev => {
        ev.preventDefault();
        saveOptions();
        document.getElementById('apiurl').focus();
    });
}