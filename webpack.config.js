var path = require('path')
var webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    proxy: {
      //    API Proxies   //
      // New
      '/new/project': "http://localhost:3000",
      '/new/category': "http://localhost:3000",
      '/new/entry': "http://localhost:3000",
      // Delete
      '/delete/project': "http://localhost:3000",
      '/delete/category': "http://localhost:3000",
      '/delete/entry': "http://localhost:3000",
      // Update
      '/update/project': "http://localhost:3000",
      '/update/category': "http://localhost:3000",
      '/update/entry': "http://localhost:3000",
      // Get
      '/get/project': "http://localhost:3000",
      '/get/projectlist': "http://localhost:3000",
      '/get/categories': "http://localhost:3000",
      '/get/entries': "http://localhost:3000"
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
