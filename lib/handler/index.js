const CustomHandler = require('./custom')
const LocalHandler = require('./local')
const OEmbedHandler = require('./oembed')

const handlers = []

// sort handlers by priority
const sort = () => handlers.sort((a, b) => b.priority - a.priority)

// Local handler
const localHandler = new LocalHandler()
handlers.push(localHandler)

// OEmbed handler
const oembedHandler = new OEmbedHandler()
handlers.push(oembedHandler)

// sort handlers
sort()

/**
 * Try to find a handler by url.
 * @param {String} url Url.
 * @returns {BaseHandler} A handler object.
 */
const find = url => {
  return handlers.find(h => h.match(url))
}

/**
 * Extract embed data from url.
 * @param {String} url Url.
 * @returns {Promise<Object>} A promise to return embed data.
 */
const extract = url => {
  const handler = find(url)
  if (!handler) return Promise.reject(new Error(`No handler found with given url "${url}"`))
  return handler.extract(url)
}

/**
 * Register an embed handler.
 * @param {String} regex The regex that will be used to see if this handler should be used for a URL.
 * @param {Function} handler The handler function that will be called if the regex is matched.
 * @param {Number} priority The handler function priority, default: 20.
 * @returns {Array} An array containing all the handlers.
 */
const register = (regex, handler, priority = 20) => {
  const customHandler = new CustomHandler(regex, handler, priority)
  handlers.push(customHandler)
  return sort()
}

module.exports = { find, extract, register }
