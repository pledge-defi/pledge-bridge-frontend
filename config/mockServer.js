const http = require('http');
const fs = require('fs');
const mock = require('mockjs').mock;

const hostname = '127.0.0.1';
const port = '2021';
const mockPath = './mock';

let mockData = {};

fs.readdir(mockPath, (err, files) => {
  const mockFiles = files.filter((f) => f !== 'mockServer.js');
  if (mockFiles && mockFiles.length) {
    mockFiles.forEach((fileName) => {
      const data = require('./' + fileName);
      mockData = { ...mockData, ...data };
    });
    // console.log(mockData);
  }
});

// console.log(Object.keys(mockData));
console.log(mockData);

const server = http.createServer((request, response) => {
  const { method, url } = request;
  const requestKey = `${method} ${url}`;
  let responseData = null;
  for (key in mockData) {
    if (requestKey.includes(key)) {
      // console.log(requestKey);
      responseData = mockData[key];
      break;
    }
  }
  if (responseData) {
    const data = mock(responseData);
    response.writeHead(200).end(JSON.stringify(data));
  } else {
    response.writeHead(400).end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
