module.exports = {
    lintOnSave: false,
    devServer: {
      port: 5005,
      proxy: {
        "/api": {
          target: "http://localhost:9000",
        }
      } 
    }
  }