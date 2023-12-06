const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // TODO: Add HtmlWebpackPlugin for each entry point
      new HtmlWebpackPlugin({
        template: './index.html', // Path to HTML file
        title: 'Simple-Text-Editor', // Title of HTML page
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker file
        swDest: 'service-worker.js', // Output service worker file name
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        Inject: true,
        name: 'Simple-Text-Editor',
        short_name: 'S.T.E',
        description: 'Take notes with Simple-Text-Editor, using JavaScript syntax highlighting.',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to app icon
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // CSS LOADER
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // BABEL LOADER
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
