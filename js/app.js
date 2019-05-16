chrome.storage.sync.get({
    apiurl: []
}, res => {
    cleanupFeed(res.apiurl);
});

function cleanupFeed(apiurl) {
    var el = document.getElementById('postData');
    if (el) {
        el.addEventListener('submit', postData);
    }

    function postData(event) {
        event.preventDefault();
        let title = document.getElementById('title').value;
        let message = document.getElementById('message').value;
        var data = {
            title: title,
            message: message,
            priority: 5
        };

        const send = document.getElementById('push');
        send.textContent = 'Pushed SuccessFully';
        setTimeout(() => {
            send.textContent = 'Refreshing the Page for Next Push';
        }, 1000);
        setTimeout(() => {
            window.location.reload();
        }, 3000);

        fetch(apiurl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }

}