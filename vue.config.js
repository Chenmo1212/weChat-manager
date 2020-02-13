module.exports = {
  // 配置跨域代理
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.powerrain.cn/',    // 你自己的api接口地址
        changeOrigin: true,
        secure: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api/',
        }
      }
    }
  }
};
