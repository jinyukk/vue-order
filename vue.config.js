const path = require('path')
const appData = require('./data.json')
const seller = appData.seller
const good = appData.good
const rating = appData.rating

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  // mock
  devServer: {
    before(app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          errno: 0,
          data: seller
        })
      })
      app.get('/api/good', function (req, res) {
        res.json({
          errno: 0,
          data: good
        })
      })
      app.get('/api/rating', function (req, res) {
        res.json({
          errno: 0,
          data: rating
        })
      })
    }
  },
  // 影响 css 中的 @import
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
  }
}
