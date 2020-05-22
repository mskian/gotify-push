chrome.contextMenus.removeAll();

chrome.contextMenus.create({
    title: 'Send image URL',
    contexts: ['image'],
    onclick: function(image) {
        var data = {
            title: 'Image URL',
            message: image.srcUrl,
            priority: 5
        };
        chrome.storage.sync.get({
                apiurl: []
            },
            res => {
                cleanupFeed(res.apiurl);
            }
        );

        function cleanupFeed(apiurl) {
            if (apiurl == 0) {
                console.log('API URL MISSING');
                chrome.tabs.getSelected(null, function(tab) {
                    alert('API URL is Missing');
                });
            } else {
                fetch(apiurl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                            console.log('Done');
                        } else {
                            console.log('Failed to Send Push');
                            chrome.tabs.getSelected(null, function(tab) {
                                alert('Failed to Send Push');
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        console.log('API Error or Connection Lost');
                        chrome.tabs.getSelected(null, function(tab) {
                            alert('Failed to Send Push');
                        });
                    })
            }
        }
    }
});

chrome.contextMenus.create({
    title: 'Send Link',
    contexts: ['link'],
    onclick: function(link) {
        var data = {
            title: 'Selected Link',
            message: link.linkUrl,
            priority: 5
        };
        chrome.storage.sync.get({
                apiurl: []
            },
            res => {
                cleanupFeed(res.apiurl);
            }
        );

        function cleanupFeed(apiurl) {
            if (apiurl == 0) {
                console.log('API URL MISSING');
                chrome.tabs.getSelected(null, function(tab) {
                    alert('API URL is Missing');
                });
            } else {
                fetch(apiurl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                            console.log('Done');
                        } else {
                            console.log('Failed to Send Push');
                            chrome.tabs.getSelected(null, function(tab) {
                                alert('Failed to Send Push');
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        console.log('API Error or Connection Lost');
                        chrome.tabs.getSelected(null, function(tab) {
                            alert('Failed to Send Push');
                        });
                    })
            }
        }
    }
});

chrome.contextMenus.create({
    title: 'Send selected text',
    contexts: ['selection'],
    onclick: function(text) {
        var data = {
            title: 'Selected Text',
            message: text.selectionText,
            priority: 5
        };
        chrome.storage.sync.get({
                apiurl: []
            },
            res => {
                cleanupFeed(res.apiurl);
            }
        );

        function cleanupFeed(apiurl) {
            if (apiurl == 0) {
                console.log('API URL MISSING');
                chrome.tabs.getSelected(null, function(tab) {
                    alert('API URL is Missing');
                });
            } else {
                fetch(apiurl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then((response) => {
                        console.log(response);
                        if (response.status === 200) {
                            console.log('Done');
                        } else {
                            console.log('Failed to Send Push');
                            chrome.tabs.getSelected(null, function(tab) {
                                alert('Failed to Send Push');
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        console.log('API Error or Connection Lost');
                        chrome.tabs.getSelected(null, function(tab) {
                            alert('Failed to Send Push');
                        });
                    })
            }
        }
    }
});