# embed-parser

[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> A parser for get embed data from url, use [oembed-parser](https://www.npmjs.com/package/oembed-parser) for fallback

## Installation

```shell
$ yarn add embed-parser

# or npm
$ npm install embed-parser
```

## Usage

```javascript
const embedParser = require('embed-parser')

embedParser('https://v.youku.com/v_show/id_XMzkyODgxODM2OA==.html').then(embed => {
  console.log(embed)
  // =>
  //  {
  //    type: 'video',
  //    version: '1.0',
  //    title: 'YouKu Video',
  //    provider_name: 'YouKu',
  //    provider_url: 'https://www.youku.com',
  //    html: '<iframe src="http://player.youku.com/embed/XMzkyODgxODM2OA==" width="640" height="360" frameborder="0" allowfullscreen></iframe>',
  //    width: 640,
  //    height: 360
  //  }
})
```

## Features

- Extract embed by local [rules](lib/handler/local-rules.json)
- use [OEmbed](https://oembed.com) for fallback
- [Custom embed handler](#example)

## API

### embedParser(url)

Extract embed data from url.

#### url

- Type: `string`
- Details: original url

### embedParser.extract(url)

- alias to `embedParser(url)`

### embedParser.hasHandler(url)

Determine if there is a matching handler.

#### url

- Type: `string`
- Details: original url

### embedParser.hasProvider(url)

- alias to `embedParser.hasHandler(url)`

### embedParser.registerHandler(regex, handler, priority = 20)

Register an custom embed handler.

#### regex

- Type: `string`
- Details: The regex that will be used to see if this handler should be used for a URL.

#### handler

- Type: `function`
- Details: The handler function that will be called if the regex is matched.

#### priority

- Type: `number`
- Details: The handler function priority
- Default: 20

#### example

```javascript
embedParser.registerHandler('http://v.zce.me/item-(.+)', matches => {
  return { html: `http://v.zce.me/embed/${matches[1]}` }
})
```

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me)



[travis-image]: https://img.shields.io/travis/zce/embed-parser.svg
[travis-url]: https://travis-ci.org/zce/embed-parser
[codecov-image]: https://img.shields.io/codecov/c/github/zce/embed-parser.svg
[codecov-url]: https://codecov.io/gh/zce/embed-parser
[downloads-image]: https://img.shields.io/npm/dm/embed-parser.svg
[downloads-url]: https://npmjs.org/package/embed-parser
[version-image]: https://img.shields.io/npm/v/embed-parser.svg
[version-url]: https://npmjs.org/package/embed-parser
[license-image]: https://img.shields.io/npm/l/embed-parser.svg
[license-url]: https://github.com/zce/embed-parser/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/embed-parser.svg
[dependency-url]: https://david-dm.org/zce/embed-parser
[devdependency-image]: https://img.shields.io/david/dev/zce/embed-parser.svg
[devdependency-url]: https://david-dm.org/zce/embed-parser?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: http://standardjs.com
