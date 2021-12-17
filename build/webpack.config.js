const HtmlWebpackPlugin =require('html-webpack-plugin')
// const MiniCssExtractPlugin =require('mini-css-extract-plugin')
const SpeedMeasurePlugin =require('speed-measure-webpack-plugin')
const OptimizeCssAssetsPlugin =require('optimize-css-assets-webpack-plugin')
const smp=new SpeedMeasurePlugin()
const { BundleAnalyzerPlugin } =require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin');
const ProgressBarPlugin =require('progress-bar-webpack-plugin')
// const {VueLoaderPlugin}=require('vue-loader')
const { VueLoaderPlugin } = require("vue-loader");

const path=require('path')
// const chalk=require('chalk')
// import chalk from 'chalk'
function resolve(dir){
    return path.join(__dirname,dir)
}
module.exports=smp.wrap({
    // module.exports={
    mode:'production',
    entry:'./src/index.js',
    output:{
     filename:'bundle.js',
     path:path.resolve(__dirname,'../dist'),
     clean:true
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'

            },
            {
               test:/\.js$/,
               loader:'babel-loader',
               exclude:/node_modules/,
               options:{
                   cacheDirectory:true,
                   presets:[
                    '@babel/preset-env'
                   ]       
               }
            },
            {
                test:/\.css$/,
                use:[
                    // MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader','postcss-loader']
            },
            {
                test:/\.less$/,
                use:[
                    // MiniCssExtractPlugin.loader,
                    'css-loader','less-loader']
            },
            {
                test:/\.(jpe?g|png|gif)$/i,
                type:'asset',
                generator:{
                    filename:'[name].[contenthash:8].[ext]'
                },
                parser:{
                    dataUrlCondition:{
                        maxSize:50* 1024
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                type:'asset',
                generator:{
                    filename:'[name].[contenthash:8].[ext]'
                },
                parser:{
                    dataUrlCondition:{
                        maxSize:50* 1024
                    }
                }
            }
          
        ]
    
    },
    plugins:[
     new HtmlWebpackPlugin({
         publicPath:'./',
         filename:'index.html'
     }),
    //  new MiniCssExtractPlugin({
    //      filename:'[name].[contenthash:8].css'
    //  })    
    new BundleAnalyzerPlugin({
        analyzerMode:'disabled',
        generateStatsFile:true
    }),
    new ProgressBarPlugin({
        // format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
    new VueLoaderPlugin()
    ],
    resolve:{
        alias:{
            '@':resolve('src'),
            vue$: "vue/dist/vue.runtime.esm.js",
        },
        extensions:[
            '.js','.json','.vue'
        ],
        modules:[resolve('src'),'node_modules']
    },
    cache:{
        type:'filesystem'
    },
    optimization:{
        minimize:true,
        minimizer:[
            new OptimizeCssAssetsPlugin({}),
            new TerserPlugin({})
        ],
        splitChunks:{
            chunks:'async',
            minSize:2000,
            minRemainingSize:0,
            minChunks:1,
            maxAsyncRequests:30,
            enforceSizeThreshold:50000,
            cacheGroups:{
                defaultVendors:{
                   test:/[\/]node_modules[\/]/,
                   priority:-10,
                   reuseExistingChunk:true
                },
                default:{
                    minChunks:2,
                    priority:-20,
                    reuseExistingChunk:true
                }
            }


        }
    }
}
)

