const {merge } =require('webpack-merge')
const baseConfig =require('./webpack.config')
const path=require('path')
module.exports=merge(baseConfig,{
    mode:'development',
    devServer:{
        static:path.resolve(__dirname,'../public'),
        compress:true,
        port:8080,
        open:true
    },
    devtool:'eval-cheap-module-source-map'
    
  
})