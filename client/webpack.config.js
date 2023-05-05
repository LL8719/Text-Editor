// Import dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.

// TODO: Add CSS loaders and babel to webpack.

// Export a function that returns the Webpack configuration object
module.exports = () => {
	return {
		// Set the mode to development
		mode: 'development',

		// Define the entry points of the application
		entry: {
			main: './src/js/index.js',
			install: './src/js/install.js',
		},

		// Define the output configuration for the compiled files
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},

		// Define the plugins to use with Webpack
		plugins: [
			// Use HtmlWebpackPlugin to generate an HTML file with references to the output JavaScript files
			new HtmlWebpackPlugin({
				template: './index.html',
				title: 'Webpack Plugin',
			}),

			// Use InjectManifest from workbox-webpack-plugin to generate a service worker from the specified file
			new InjectManifest({
				swSrc: './src/sw.js',
				swDest: 'service-worker.js',
			}),
			new WebpackPwaManifest({
				fingerprints: false,
				inject: true,
				name: 'Text-Editor',
				short_name: 'JATE',
				description: 'Text Editor',
				background_color: '#225ca3',
				theme_color: '#225ca3',
				start_url: '/',
				publicPath: '/',
				icons: [
					{
						src: path.resolve('src/images/logo.png'),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join('assets', 'icons'),
						ios: true,
					},
				],
			}),
		],

		// Define the loaders to use for different file types
		module: {
			rules: [
				// Use style-loader and css-loader for CSS files
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},

				// Use babel-loader to transpile JavaScript files
				{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
							plugins: [
								'@babel/plugin-proposal-object-rest-spread',
								'@babel/transform-runtime',
							],
						},
					},
				},
			],
		},
	};
};
