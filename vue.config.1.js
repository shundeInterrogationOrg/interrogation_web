module.exports = {
  // publicPath: './',
  // css: {
  //   loaderOptions: {
  //     // 给 sass-loader 传递选项
  //     sass: {
  //       data: `@import "@/assets/sass/variables.scss";`
  //     }
  //   }
  // },
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  devServer: {
    port: 8090,
    proxy: {
      '/bigdata': {
        target: `http://localhost:8090/mock`,
        changeOrigin: true,
        pathRewrite: {
          '/bigdata': ''
        }
      }
      // '/bigdata': {
      //   target: 'http://192.168.43.88:3001',
      //   changeOrigin: true
      // }
    },
    overlay: {
      warnings: true,
      errors: true
    }
    // after: require('./mock/mock-server')
  }
}
