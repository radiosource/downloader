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

module.exports = Downloader;
module.exports.default = Downloader;

