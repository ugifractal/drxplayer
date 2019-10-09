module.exports = {
  outputDir: "../public/fe",
  filenameHashing: false,

  configureWebpack: {// (config)=> {
    //config.output.filename = "app_main.js"
    output: {
      filename: 'app_main.js' //'[name].js',
      //chunkFilename: '[name].js'
    }
    
  },
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  }
  /*
  chainWebpack: config => {
    if(config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css')
      extractCSSPlugin && extractCSSPlugin.tap(() => [{
        filename: '[name].css',
        chunkFilename: '[name].css'
      }])
    }
  }*/
}
