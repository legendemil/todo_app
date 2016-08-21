var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./main.js",
  output: {
        filename: 'bundle.js'
  },
  module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /\.sass$/,
                exclude: /node_modules/,
                loader: 'style!css!sass'
            }, {
                test: /\.(jpg|png|gif)$/,
                include: /img/,
                loader: 'url'
            }
        ],
    },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};

// module.exports = {
//     entry: './main.js',
//     output: {
//         filename: 'bundle.js'
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: 'babel',
//                 query: {
//                     presets: ['es2015']
//                 }
//             }, {
// 			    test: /\.sass$/,
// 			    exclude: /node_modules/,
// 			    loader: 'style!css!sass'
// 			}, {
//                 test: /\.(jpg|png|gif)$/,
//                 include: /img/,
//                 loader: 'url'
//             }
//         ],
//     }
// };