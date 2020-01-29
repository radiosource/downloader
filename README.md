# downloader
Easy promise based client for downloading files from url
## Installing

```bash
$ npm install downloader.js
```

## Example

```js
const file = new Downloader('/home/downloads/');
await file.download({downloadLink: 'https://coubsecure-s.akamaihd.net/get/b31/p/coub/simple/cw_video_for_sharing/7ed4e938910/f5591eba05f53cb2fe86e/1580282505_looped_1580282503.mp4'})
          .catch(console.error);
```
## API

##### constructor(downloadDir) //process.cwd() by default
##### download({downloadLink, [fileName]}, [requestOptions])
//requestOptions like `headers`, `refferer` etc. It can be important for some download links.
