const {merge } =require('webpack-merge')
import baseConfig from './webpack.config'

module.exports=merge(baseConfig,{
    mode:'developmement',
  
})