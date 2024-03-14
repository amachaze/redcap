module.exports = {
    // publicPath: './',
    /* chainWebpack: config => {
        config.performance
        .maxEntrypointSize(10000000)
        .maxAssetSize(10000000)
    },*/
    filenameHashing: false,
    configureWebpack: {
        optimization: {
            splitChunks: false
        }
    },
    productionSourceMap: false,
    css: { extract: false },
    devServer: {
        client: {
            overlay: {
                warnings: false,
                errors: true
            },
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