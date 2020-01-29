const fs = require('fs');
const path = require('path');
const axios = require('axios');


class Downloader {
  constructor(downloadDir = process.cwd()) {
    this.downloadDir = path.resolve(downloadDir);
  }

  download({downloadLink, fileName}, requestOptions = {}) {
    if(!downloadLink) throw Error('downloadLink is required');
    const downloadLinkItems = downloadLink.split('/');
    requestOptions.headers = requestOptions.headers || {};
    requestOptions.headers.host = requestOptions.headers.host || downloadLinkItems[2];
    fileName = fileName || downloadLinkItems[downloadLinkItems.length - 1];

    const readableStream = fs.createWriteStream(path.resolve(this.downloadDir,fileName));

    return axios(
        {
          url: downloadLink,
          responseType: 'stream',
          ...requestOptions,
        })
        .then(({data}) => {
          let receivedBytes = 0;
          data.pipe(readableStream);
          return new Promise((resolve) => {
            data.on('data', chunk => receivedBytes += chunk.length);
            readableStream.on('finish', () => resolve(receivedBytes));
          })
        })
  }
}

(async()=>{
  const x = new Downloader('/home/zagnit/');
  await x.download({downloadLink: 'https://coubsecure-s.akamaihd.net/get/b31/p/coub/simple/cw_video_for_sharing/7ed4e938910/f5591eba05f53cb2fe86e/1580282505_looped_1580282503.mp4?dl=1'});
})();

