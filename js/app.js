chrome.storage.sync.get({
    apiurl: []
}, res => {
    cleanupFeed(res.apiurl);
});

function cleanupFeed(apiurl) {
    var el = document.querySelector('#postData');
    if (el) {
        el.addEventListener('submit', postData);
    }

    function postData(event) {
        event.preventDefault();
        let title = document.querySelector('#title').value;
        let message = document.querySelector('#message').value;
        var data = {
            title: title,
            message: message,
            priority: 5
        };

        const send = document.querySelector('#push');
        send.classList.add("loading")     

        fetch(apiurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(
            el.reset(),
            res => res.json(),
            setTimeout(() => {
                send.classList.remove("loading")
                send.textContent = "Pushed!"
            }, 500),
            setTimeout(() => {
                send.textContent = "Send"
            }, 700)
        )
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    }
}