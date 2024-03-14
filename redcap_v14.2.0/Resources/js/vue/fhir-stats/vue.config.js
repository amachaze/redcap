module.exports = {
    productionSourceMap: false,
    css: { extract: false },
    devServer: {
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/': {
                target: 'https://redcap.test/API_PROXY/index.php',
                ws: false,
                changeOrigin: true,
                pathRewrite: {'^/': ''}
            },
        },
    }
}