# Gotify push

> Gotify Google Chrome Extension

Chrome Extension for Send Push Notification to gotify/server 🔔

[![Gotify Push](https://res.cloudinary.com/veer/image/upload/v1590140120/web-store_iwlsro.png)](https://chrome.google.com/webstore/detail/gotify-push/cbegkpikakpajcaoblfkeindhhikpfmd)  

🖥 System Font  
💅 Spectre.css Framework  
💯 Light Weight and Optimized  
⏳ Fetch API  

## Requirments

- Gotify API

## Installation

- Download or Clone this Github Respo
- Open the Extension Management Page - `chrome://extensions`
- Enable Developer Mode by clicking the toggle switch next to Developer mode.
- Click the `LOAD UNPACKED` button and select the unzipped extension directory

## Usage

- you can Find the Plugin Option page on Chrome toolbar Right side of the Address bar
- Click Gotify Setup Button and Enter your Gotify APP API URL and Save it
- That's all Successfully Setup Gotify Push Extension on your Brower

## Allow CORS

You must configure your server CORS allow this extension to Send push notification from this Extension

- Open `config.yml` File and Update this Setup

```yaml
server:
  cors:
    alloworigins:
        - "chrome-extension://cbegkpikakpajcaoblfkeindhhikpfmd"
    allowmethods:
        - "GET"
        - "POST"
    allowheaders:
        - "Authorization"
        - "content-type"
  stream:
    allowedorigins: # allowed origins for websocket connections (same origin is always allowed, default only same origin)
      - "cbegkpikakpajcaoblfkeindhhikpfmd"
```

## Features

- Send Custom Push Notification
- Send Current page INFO
- Send Image URL
- Send Link
- Send Selected Text

![Gotify push](https://raw.githubusercontent.com/mskian/gotify-push/master/screenshot/Screenshot1.png)  

![Gotify push](https://raw.githubusercontent.com/mskian/gotify-push/master/screenshot/Screenshot2.png)  

![Gotify push](https://raw.githubusercontent.com/mskian/gotify-push/master/screenshot/Screenshot3.png)  

![Gotify push](https://raw.githubusercontent.com/mskian/gotify-push/master/screenshot/Screenshot4.png)  

### LICENSE

MIT
