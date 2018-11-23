/**
 * Local embed handler
 */

const BaseHandler = require('./base')
const rules = require('./local-rules')

/**
 * Compile an ES6 template literals to a Template function
 * @param {String} source ES6 template literals
 */
const compile = source => {
  return context => {
    /* eslint-disable no-new-func */
    const props = Object.keys(context).join(', ')
    return new Function(`{ ${props} }`, `return \`${source}\``)(context)
  }
}

const getEmbed = (rule, matches) => {
  const embed = Object.assign({}, rule)
  delete embed.regex

  // https://oembed.com/#section2.3

  const context = Object.assign({ matches }, rule)
  const isTemplate = input => /\${[^{}]+}/.test(input)

  Object.keys(embed).forEach(key => {
    const item = embed[key]
    if (typeof item === 'string' && isTemplate(item)) {
      embed[key] = compile(embed[key])(context)
    }
  })

  // remove regex
  return embed
}

module.exports = class LocalHandler extends BaseHandler {
  constructor () {
    super()
    this.rules = rules.map(item => {
      if (!item.regex) throw new Error('`local-rule.js` is invalid: Must have regex attribute')
      item.regex = new RegExp(item.regex)
      return item
    })
  }

  match (url) {
    return this.rules.some(item => item.regex.test(url))
  }

  extract (url) {
    const rule = this.rules.find(item => item.regex.test(url))
    // try to extract matches from url
    const matches = rule.regex.exec(url)
    if (!matches) return Promise.reject(new Error(`Can not extract embed from given url "${url}"`))

    // embed data
    const embed = getEmbed(rule, matches)
    return Promise.resolve(embed)
  }
}
