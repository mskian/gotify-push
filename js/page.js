chrome.storage.sync.get({
  apiurl: []
}, res => {
  cleanupFeed(res.apiurl);
});

function cleanupFeed(apiurl) {

  var el = document.getElementById('pushpage');
  if (el) {
      el.addEventListener('submit', pushpage);
  }

  function pushpage(event) {

      event.preventDefault();

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
          const send = document.getElementById('push');
          send.textContent = 'Pushed SuccessFully';
          setTimeout(() => {
              send.textContent = 'Refreshing';
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
      });
  }
}