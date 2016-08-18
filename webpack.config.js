module.exports = {
    entry: './main.js',
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
			}
        ],
    }
};