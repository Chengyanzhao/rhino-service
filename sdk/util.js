exports.DIR_PARAM_TYPE = {
  DIR_PATH: 'dirPath',
  DIR_ID: 'dirId'
}

/**
 * @param {String} name
 * @return {String} normalizeName
 */
exports.normalizeName = function (name) {
  return decodeURI(name)
}

/**
 * @param {String} dirParam dir参数
 * @return {String} DIR_PARAM_TYPE
 */
exports.getDirParamType = function (dirParam) {
  return dirParam.indexOf('/') === -1 ? exports.DIR_PARAM_TYPE.DIR_ID : exports.DIR_PARAM_TYPE.DIR_PATH
}