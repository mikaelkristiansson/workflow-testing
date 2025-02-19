const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const url = require('node:url');

const app = express();
const PORT = 8081;

app.use(cors());

const proxyReqOptDecorator = () => (proxyReqOpts, srcReq) => {
  const parsedHost = url.parse(`http://${srcReq.headers.host}`);
  // const tld = getTld(parsedHost.hostname);
  const { hostname } = parsedHost;

  proxyReqOpts.headers['X-forwarded-server'] = hostname; // eslint-disable-line no-param-reassign
  proxyReqOpts.headers.origin = hostname; // eslint-disable-line no-param-reassign
  proxyReqOpts.headers.host = hostname; // eslint-disable-line no-param-reassign
  return proxyReqOpts;
};

app.use(
  proxy('http://localhost:8080', {
    https: false,
    proxyReqOptDecorator: proxyReqOptDecorator(),
    proxyReqPathResolver: (req) => req.originalUrl,
  })
);

app.listen(PORT, () => {
  console.log(`Server: running on http://localhost:${PORT}`);
});
