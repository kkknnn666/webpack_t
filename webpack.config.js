//webpack.config.js
//“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
//
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项

	entry: __dirname + "/app/main.js",
	output:{
		path: __dirname + "/build",//打包后文件存放的地方
		filename: "bundle.js"//打包后输出文件的文件名
	},

	module:{//在配置文件里添加JSON loader
		loaders:[
			{
				test:/\.json$/,
				loader:"json-loader"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'//在webpack的module部分的loaders里进行配置即可
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader?modules-loaer'//感叹号的作用在于使同一文件能够使用不同类型的loader
			}//?不必担心在不同的模块中具有相同的类名可能会造成的问题
		]
	},

	// postcss: [
	//     require('autoprefixer')//调用autoprefixer插件
	// ],

	// plugins:[
	// 	new webpack.BannerPlugin("Copyright Flying Unicorns inc.")//在这个数组中new一个就可以了
	// ],
	
	plugins:[
		new HtmlWebpackPlugin({
			template: __dirname + "/app/index.tmpl.html"
		}),
		new webpack.HotModuleReplacementPlugin()//热加载插件
	],

	devServer:{
		contentBase:"./build",//本地服务器所加载的页面所在的目录
		// color:true,
		historyApiFallback: true,//不跳转
    	inline: true,//实时刷新
    	hot: true
	}
}