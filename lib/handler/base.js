/**
 * Base embed handler
 */

module.exports = class BaseHandler {
  constructor (priority = 10) {
    this.priority = priority
  }

  match (url) {
    throw new Error('Must implement `.match(url)` method')
  }

  extract (url) {
    throw new Error('Must implement `.extract(url)` method')
  }
}
