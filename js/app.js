chrome.storage.sync.get(
    {
      apiurl: [],
    },
    (res) => {
      cleanupFeed(res.apiurl);
    }
  );
  
  function cleanupFeed(apiurl) {
    var el = document.querySelector("#postData");
    if (el) {
      el.addEventListener("submit", postData);
    }
  
    var push = document.querySelector("#pushinfo");
    if (push) {
      push.addEventListener("click", pushpage);
    }
  
    function postData(event) {
      event.preventDefault();
      let title = document.querySelector("#title").value;
      let message = document.querySelector("#message").value;
      if (title == 0 || message == 0) {
        const apiurl = document.getElementById("push");
        apiurl.innerHTML = "<br><b>Empty Title or Message</b><br>";
      } else {
        var data = {
          title: title,
          message: message,
          priority: 5,
        };
  
        const send = document.querySelector("#push");
        send.classList.add("loading");
  
        if (apiurl == 0) {
          console.log("API URL MISSING");
          send.classList.remove("loading");
          send.innerHTML = "<br><b>API URL MISSING</b><br>";
        } else {
          fetch(apiurl, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                el.reset(),
                  setTimeout(() => {
                    send.classList.remove("loading");
                    send.innerHTML = "<br><b>Successfully Pushed</b><br>";
                  }, 1000);
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              } else {
                el.reset(),
                  setTimeout(() => {
                    send.classList.remove("loading");
                    send.innerHTML = "<br><b>Failed to Send Push</b><br>";
                  }, 1000);
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              }
            })
            .catch((error) => {
              console.log("Error:", error);
              el.reset(),
                setTimeout(() => {
                  send.classList.remove("loading");
                  send.innerHTML = "<br><b>API Error or Connection Lost</b><br>";
                }, 1000);
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            });
        }
      }
    }
  
    function pushpage() {
      push.classList.add("loading");
      chrome.tabs.query(
        {
          currentWindow: true,
          active: true,
        },
        function (tabs) {
          var tab = tabs[0];
          var data = {
            title: tab.title,
            message: tab.url,
            priority: 5,
          };
  
          if (apiurl == 0) {
            console.log("API URL MISSING");
            push.classList.remove("loading");
            push.innerHTML = "<br><b>API URL MISSING</b><br>";
            setTimeout(() => {
              window.location.reload();
            }, 700);
          } else {
            fetch(apiurl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((response) => {
                if (response.status === 200) {
                  setTimeout(() => {
                    push.classList.remove("loading");
                    push.textContent = "Pushed SuccessFully";
                  }, 1000);
                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
                } else {
                  push.classList.remove("loading");
                  push.innerHTML = "<br><b>API Error</b><br>";
                  setTimeout(() => {
                    window.location.reload();
                  }, 700);
                }
              })
              .catch((error) => {
                console.log("Error:", error);
                push.classList.remove("loading");
                push.innerHTML = "<br><b>Connection Error</b><br>";
                setTimeout(() => {
                  window.location.reload();
                }, 700);
              });
          }
        }
      );
    }
  }
  