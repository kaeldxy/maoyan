const { createProxyMiddleware } = require('http-proxy-middleware');
const target = 'http://127.0.0.1:4000'
const options = {
    target: target, // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
        // '^/api/old-path': '/api/new-path', // rewrite path
        '^/api': '/', // remove base path
    },
};

module.exports = { httpPoxy: createProxyMiddleware(options), target }