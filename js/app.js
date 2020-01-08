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

    var push = document.querySelector('#pushinfo');
    if (push) {
        push.addEventListener('click', pushpage);
    }

    function postData(event) {
        event.preventDefault();
        let title = document.querySelector('#title').value;
        let message = document.querySelector('#message').value;
        if (title == 0 || message == 0) {
            const apiurl = document.getElementById('push');
            apiurl.innerHTML = '<b>Empty Title or Message</b>';
        } else {
            var data = {
                title: title,
                message: message,
                priority: 5
            };

            const send = document.querySelector('#push');
            send.classList.add('loading');

            fetch(apiurl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => {
                    if (response.ok) {
                        el.reset(),
                            setTimeout(() => {
                                send.classList.remove('loading');
                                send.innerHTML = '<b>Successfully Pushed</b>'
                            }, 1000);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        return response.json();
                    } else {
                        el.reset(),
                        send.classList.remove('loading');
                        send.innerHTML = '<b>Something went Wrong<br>API Error or Wrong API</b>'
                        setTimeout(() => {
                            window.location.reload();
                        }, 600);
                    }
                })
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));
        }
    }

    function pushpage() {
        push.classList.add('loading');
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function(tabs) {
            var tab = tabs[0]
            var data = {
                title: tab.title,
                message: tab.url,
                priority: 5
            };

            fetch(apiurl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => {
                    if (response.ok) {
                        setTimeout(() => {
                            push.classList.remove('loading');
                            push.textContent = 'Pushed SuccessFully';
                        }, 1000);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        return response.json();
                    } else {
                        push.classList.remove('loading')
                        push.innerHTML = '<b>API Error</b>'
                        setTimeout(() => {
                            window.location.reload();
                        }, 600);
                    }
                })
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));
        });
    }
}