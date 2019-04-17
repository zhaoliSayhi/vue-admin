const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  // 是否开启eslint
  lintOnSave: false,
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.html',".less", ".css"],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'components': resolve('src/components'),
        'common': resolve('src/common'),
        'pages': resolve('src/pages'),
        'assets': resolve('src/assets'),
        'base': resolve('src/base'),
        'api': resolve('src/api'),
      }
    }
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，本地开发环境的axios的baseUrl要写为 ''
  devServer: {
    proxy: ''
  }
};