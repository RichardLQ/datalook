module.exports = {
  publicPath: '/public/admin/data_view/',
  chainWebpack: config =>{
      config.plugin('html').tap(args => {
          args[0].title = '数据面板';
          return args;
      })
  },
}