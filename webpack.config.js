module.exports = {
  entry: './src/app.ts',
  output: {
    filename: './dist/app.js',
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
    ],
  },

  // Other options...
};
