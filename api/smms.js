// const rp = require('request-promise-native')
const rp = require('request-promise')
const request = require('request')

exports.deleteImg = function (deleteUrl) {
  const options = {
    uri: deleteUrl,
    method: 'GET',
    json: true,
    headers: {
      'User-Agent': 'request'
    }
  }
  request(options, (err, res, body) => {
    debugger
  })
  // return rp(options).then(res => {
  //   debugger
  // }).catch(err => {
  //   throw err
  // })
}