/**
 * OEmbed embed handler
 */

const oembedParser = require('oembed-parser/src/main')

const BaseHandler = require('./base')

module.exports = class OEmbedHandler extends BaseHandler {
  match (url) {
    return oembedParser.hasProvider(url)
  }

  extract (url) {
    return oembedParser.extract(url)
  }
}
