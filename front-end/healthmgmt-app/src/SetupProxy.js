const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://healthmanagementapi.orangewave-663720c0.eastus.azurecontainerapps.io',
            changeOrigin: true,
        })
    );
};
