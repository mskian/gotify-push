chrome.storage.sync.get({
  apiurl: []
}, res => {
  cleanupFeed(res.apiurl);
});

function cleanupFeed(apiurl) {

  var el = document.querySelector('#pushinfo');
  if (el) {
      el.addEventListener('click', pushpage);
  }

  function pushpage() {
    const send = document.querySelector('#pushinfo');
    send.classList.add("loading");
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
          
          send.textContent = 'Pushed SuccessFully';
          setTimeout(() => {
            send.classList.remove("loading");
            send.textContent = 'Pushed SuccessFully';
          }, 500);
          setTimeout(() => {
            send.textContent = 'Push Page Info';  
          }, 1000);

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
      });
  }
}