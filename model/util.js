exports.getConnectionStr = ({
  host = '127.0.0.1',
  port = '27017',
  database = '',
  user = '',
  pwd = '',
}) => {
  const protocol = 'mongodb://'
  let auth = ''
  if (user) {
    auth = `${encodeURIComponent(user)}:${encodeURIComponent(pwd)}@`
  }
  return `${protocol}${auth}${host}:${port}/${database}`
}

/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
/**
 * Document.prototype.toObject options
 * change prop '_id' to id
 */
exports.toObjectOpts = {
  versionKey: false,
  transform(doc, ret) {
    const retCopy = ret
    retCopy.id = retCopy._id
    delete retCopy._id
    return ret
  },
}
