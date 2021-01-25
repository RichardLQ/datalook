const webpack = require("webpack");
module.exports = {
  publicPath: '/public/admin/data_view/',
  chainWebpack: config =>{
      config.plugin('html').tap(args => {
          args[0].title = '数据面板';
          return args;
      })
  },
  configureWebpack:{
    plugins:[
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery",
      })
    ]
  }
}