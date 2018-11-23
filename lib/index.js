const handler = require('./handler')
const { version } = require('../package')

const isValidURL = input => {
  if (!input) return false
  const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  return regex.test(input)
}

/**
 * Extract embed data from url.
 * @param {String} url Url.
 * @returns {Promise<Object>} A promise to return embed data.
 */
const embedParser = url => {
  // validate url
  if (!isValidURL(url)) { return Promise.reject(new Error('Invalid input URL')) }

  return handler.extract(url)
}

/**
 * Determine if there is a matching handler.
 * @param {String} url Url.
 * @returns {Boolean} Yes or no.
 */
embedParser.hasHandler = url => {
  // validate url
  if (!isValidURL(url)) throw new Error('Invalid input URL')

  return !!handler.find(url)
}

/**
 * Register an custom embed handler.
 * @param {String} regex The regex that will be used to see if this handler should be used for a URL.
 * @param {Function} handler The handler function that will be called if the regex is matched.
 * @param {Number} priority The handler function priority, default: 20.
 * @returns {Array} An array containing all the handlers.
 */
embedParser.registerHandler = handler.register

// Compatible with oembed-parser api
embedParser.version = version
embedParser.extract = embedParser
embedParser.hasProvider = embedParser.hasHandler

module.exports = embedParser
