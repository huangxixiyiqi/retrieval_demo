const { defineConfig } = require('@vue/cli-service');


module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 刚创建新的项目；每次运行出现很多警告。
  assetsDir: 'static', // 放置静态资源
  parallel: false, //  打包时打开
  publicPath: './', // 指定资源文件引用的目录
  devServer: {
    proxy: {
      '/api': {
        target: 'http://118.31.229.116:6009',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // 将 /api 替换为空字符串
        },
      },
      '/demo_core': {
        target: 'http://118.31.229.116:6011',
        changeOrigin: true,
        pathRewrite: {
          '^/demo_core': '', 
        },
      },
    },
  },
});