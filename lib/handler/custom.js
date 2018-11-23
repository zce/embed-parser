/**
 * Custom embed handler
 */

const BaseHandler = require('./base')

module.exports = class CustomHandler extends BaseHandler {
  constructor (regex, handler, priority) {
    super(priority)

    if (typeof regex !== 'string') {
      throw new Error(`Invalid custom handler regex: ${regex}`)
    }
    if (typeof handler !== 'function') {
      throw new Error(`Invalid custom handler: ${handler}`)
    }

    this.regex = new RegExp(regex, 'i')
    this.handler = handler
  }

  match (url) {
    return this.regex.test(url)
  }

  extract (url) {
    const matches = this.regex.exec(url)
    if (!matches) return Promise.reject(new Error(`Can not extract embed from given url "${url}"`))
    return this.handler(matches)
  }
}
