'use strict';

const stompit = require('stompit');

const connectOptions = {
  host: 'localhost',
  port: 61613,
  connectHeaders: {
    host: '/',
    login: 'username',
    passcode: 'password',
    'heart-beat': '5000,5000',
  },
};

stompit.connect(connectOptions, (error, client) => {
  if (error) {
    console.log(`connect error ${error.message}`);
    return;
  }
  const sendHeaders = {
    destination: '/queue/test321',
    'content-type': 'text/plain',
  };

  let message;

  for (let i = 1; i <= 20; i++) {
    const frame = client.send(sendHeaders);
    message = `<?xml version="1.0" encoding="UTF-8"?> <stocks> <stock itemId="${i}000000" totalQty="320" storePoolTotal="271" timestamp="2018-11-08T11:39:43.600" hubTotal="49" londonSameDayPoolTotal="0" hub="GB20"/> </stocks>`;
    frame.write(message);
    frame.end();
  }
  client.disconnect();
});