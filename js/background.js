chrome.contextMenus.removeAll();

chrome.contextMenus.create({
  title: "Send image URL",
  contexts: ["image"],
  onclick: function(image) {
    var data = {
      title: "Image URL",
      message: image.srcUrl,
      priority: 5
    };
    chrome.storage.sync.get(
      {
        apiurl: []
      },
      res => {
        cleanupFeed(res.apiurl);
      }
    );

    function cleanupFeed(apiurl) {
      fetch(apiurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(response => console.log("Success:", JSON.stringify(response)))
        .catch(error => console.error("Error:", error));
    }
  }
});

chrome.contextMenus.create({
  title: "Send Link",
  contexts: ["link"],
  onclick: function(link) {
    var data = {
      title: "Selected Link",
      message: link.linkUrl,
      priority: 5
    };
    chrome.storage.sync.get(
      {
        apiurl: []
      },
      res => {
        cleanupFeed(res.apiurl);
      }
    );

    function cleanupFeed(apiurl) {
      fetch(apiurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(response => console.log("Success:", JSON.stringify(response)))
        .catch(error => console.error("Error:", error));
    }
  }
});

chrome.contextMenus.create({
  title: "Send selected text",
  contexts: ["selection"],
  onclick: function(text) {
    var data = {
      title: "Selected Text",
      message: text.selectionText,
      priority: 5
    };
    chrome.storage.sync.get(
      {
        apiurl: []
      },
      res => {
        cleanupFeed(res.apiurl);
      }
    );

    function cleanupFeed(apiurl) {
      fetch(apiurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(response => console.log("Success:", JSON.stringify(response)))
        .catch(error => console.error("Error:", error));
    }
  }
});
