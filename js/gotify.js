function saveOptions() {
    const apiurl = document.querySelector('#apiurl').value;
    chrome.storage.sync.set({
        apiurl
    }, () => {
        restoreOptions();
        const save = document.querySelector('#save');
        save.classList.add("loading");
        setTimeout(() => {
            save.classList.remove("loading")
            save.textContent = 'Save';
        }, 1000);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        apiurl: []
    }, result => {
        var apifield = document.querySelector('#apiurl');
        if (apifield != null) {
            apifield.value = result.apiurl;
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
var save = document.querySelector('#save');
if (save) {
    save.addEventListener('click', saveOptions);
}
var form = document.querySelector('#form');
if (form) {
    form.addEventListener('submit', ev => {
        ev.preventDefault();
        saveOptions();
        document.querySelector('#apiurl').focus();
    });
}