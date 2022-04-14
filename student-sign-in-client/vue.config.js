module.exports = {
  devServer: {
    // proxy requests from Vue app to a Express server
    proxy: 'http://127.0.0.1:3000'
  }
}