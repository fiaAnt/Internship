import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '.env'),
});

const config = {
  context: __dirname,
  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@types': path.resolve(__dirname, 'src/types/'),
      '@elements': path.resolve(__dirname, 'src/components/elements/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@store': path.resolve(__dirname, 'src/store/'),
      '@api': path.resolve(__dirname, 'src/api/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.AUTH0_CLIENT_ID': JSON.stringify(
        process.env.AUTH0_CLIENT_ID,
      ),
      'process.env.CLIENT_URL': JSON.stringify(process.env.CLIENT_URL),
      'process.env.REACT_APP_BASE_URL': JSON.stringify(
        process.env.REACT_APP_BASE_URL,
      ),
      'process.env.REACT_APP_CLIENT_URL': JSON.stringify(
        process.env.REACT_APP_CLIENT_URL,
      ),
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};

export default config;
