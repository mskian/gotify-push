function saveOptions() {
    const apiurl = document.querySelector("#apiurl").value;
    //var re = /^HTTP|HTTP|http(s)?:\/\/(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,40}(:[0-9]{1,40})?(\/.*)?$/;
    var re =
      /(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/;
    if (apiurl == 0) {
      const apiurl = document.getElementById("save");
      apiurl.innerHTML = "<br><b>Gotify API URL and Key is Missing</b><br>";
    } else if (!re.test(apiurl)) {
      console.log("Enter a Valid API URL");
      const apiurl = document.getElementById("save");
      apiurl.innerHTML = "<br><b>Enter a Valid API URL</b><br>";
      return false;
    } else {
      chrome.storage.sync.set(
        {
          apiurl,
        },
        () => {
          restoreOptions();
          const apiurl = document.getElementById("save");
          apiurl.innerHTML = "<br><br>";
          apiurl.classList.add("loading");
          setTimeout(() => {
            apiurl.classList.remove("loading");
            apiurl.innerHTML = "<br><b>API KEY Saved<b><br>";
          }, 1000);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      );
    }
  }
  
  function restoreOptions() {
    chrome.storage.sync.get(
      {
        apiurl: [],
      },
      (result) => {
        if (document.getElementById("apiurl") != null) {
          document.getElementById("apiurl").value = result.apiurl;
        }
      }
    );
  }
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  var el = document.getElementById("save");
  if (el) {
    el.addEventListener("click", saveOptions);
  }
  var gc = document.getElementById("form");
  if (gc) {
    gc.addEventListener("submit", (ev) => {
      ev.preventDefault();
      saveOptions();
      document.getElementById("apiurl").focus();
    });
  }
  