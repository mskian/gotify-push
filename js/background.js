if (chrome.contextMenus) {
  chrome.contextMenus.removeAll();

  chrome.contextMenus.create(
    {
      id: "CONTEXT_MENU_ID_IMG",
      title: "Send image URL",
      contexts: ["image"],
    },
    chrome.contextMenus.onClicked.addListener(function (image) {
      var data = {
        title: "Image URL",
        message: image.srcUrl,
        priority: 5,
      };
      chrome.storage.sync.get(
        {
          apiurl: [],
        },
        (res) => {
          cleanupFeed(res.apiurl);
        }
      );
      function cleanupFeed(apiurl) {
        if (image.menuItemId === "CONTEXT_MENU_ID_IMG") {
          if (apiurl == 0) {
            console.log("API URL MISSING");
          } else {
            fetch(apiurl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  console.log("Done");
                } else {
                  console.log("Failed to Send Push");
                }
              })
              .catch((error) => {
                console.log(error);
                console.log("API Error or Connection Lost");
              });
          }
        }
      }
    })
  );

  chrome.contextMenus.create(
    {
      id: "CONTEXT_MENU_ID_LINK",
      title: "Send Link",
      contexts: ["link"],
    },
    chrome.contextMenus.onClicked.addListener(function (link) {
      var data = {
        title: "Selected Link",
        message: link.linkUrl,
        priority: 5,
      };
      chrome.storage.sync.get(
        {
          apiurl: [],
        },
        (res) => {
          cleanupFeed(res.apiurl);
        }
      );
      function cleanupFeed(apiurl) {
        if (link.menuItemId === "CONTEXT_MENU_ID_LINK") {
          if (apiurl == 0) {
            console.log("API URL MISSING");
          } else {
            fetch(apiurl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  console.log("Done");
                } else {
                  console.log("Failed to Send Push");
                }
              })
              .catch((error) => {
                console.log(error);
                console.log("API Error or Connection Lost");
              });
          }
        }
      }
    })
  );

  chrome.contextMenus.create(
    {
      id: "CONTEXT_MENU_ID_TEXT",
      title: "Send selected text",
      contexts: ["selection"],
    },
    chrome.contextMenus.onClicked.addListener(function (text) {
      var data = {
        title: "selected text",
        message: text.selectionText,
        priority: 5,
      };
      chrome.storage.sync.get(
        {
          apiurl: [],
        },
        (res) => {
          cleanupFeed(res.apiurl);
        }
      );

      function cleanupFeed(apiurl) {
        if (text.menuItemId === "CONTEXT_MENU_ID_TEXT") {
          if (apiurl == 0) {
            console.log("API URL MISSING");
          } else {
            fetch(apiurl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  console.log("Done");
                } else {
                  console.log("Failed to Send Push");
                }
              })
              .catch((error) => {
                console.log(error);
                console.log("API Error or Connection Lost");
              });
          }
        }
      }
    })
  );
}
