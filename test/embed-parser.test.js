import test from 'ava'
import embedParser from '..'
import { version } from '../package'

test('extract-local-youku', async t => {
  const embed = await embedParser('https://v.youku.com/v_show/id_XMzkyODgxODM2OA==.html')
  t.is(embed.provider_name, 'YouKu')
  t.is(embed.html, '<iframe src="//player.youku.com/embed/XMzkyODgxODM2OA==" width="640" height="360" frameborder="0" allowfullscreen></iframe>')
})

test('extract-local-bilibili', async t => {
  const embed = await embedParser('https://www.bilibili.com/video/av21536312')
  t.is(embed.provider_name, 'Bilibili')
  t.is(embed.html, '<iframe src="//player.bilibili.com/player.html?aid=21536312" width="640" height="360" frameborder="0" allowfullscreen></iframe>')
})

test('extract-oembed', async t => {
  const embed = await embedParser('https://codepen.io/zce/pen/JepwwN')
  t.is(embed.provider_name, 'Codepen')
})

test('extract-custom', async t => {
  embedParser.registerHandler('http://v.zce.me/item-(.+)', matches => {
    return Promise.resolve({ url: `http://v.zce.me/embed/${matches[1]}` })
  })
  const embed = await embedParser('http://v.zce.me/item-fake-slug')
  t.is(embed.url, 'http://v.zce.me/embed/fake-slug')
})

test('extract-failed', async t => {
  await t.throwsAsync(
    () => embedParser('https://fakkkkkkkkkkkkker.com/item-fake-slug'),
    'No handler found with given url "https://fakkkkkkkkkkkkker.com/item-fake-slug"'
  )
})

test('extract-with-invalid-url', async t => {
  await t.throwsAsync(() => embedParser('invalid url'), 'Invalid input URL')
  await t.throwsAsync(() => embedParser(), 'Invalid input URL')
})

test('hasHandler-local', t => {
  t.true(embedParser.hasHandler('https://v.youku.com/v_show/id_XMzkyODgxODM2OA==.html'))
  t.false(embedParser.hasHandler('https://fakkkkkkkkkkkkker.com'))
})

test('hasHandler-oembed', t => {
  t.true(embedParser.hasHandler('https://codepen.io/zce/pen/JepwwN'))
  t.false(embedParser.hasHandler('https://fakkkkkkkkkkkkker.com'))
})

test('hasHandler-custom', t => {
  embedParser.registerHandler('http://v.zce.me/item-(.+)', () => {})
  t.true(embedParser.hasHandler('http://v.zce.me/item-fake-slug'))
})

test('hasHandler-with-invalid-url', t => {
  t.throws(() => embedParser.hasHandler('invalid url'), 'Invalid input URL')
  t.throws(() => embedParser.hasHandler(), 'Invalid input URL')
})

test('registerHandler', async t => {
  const fn = () => {}
  const addedHandler = embedParser.registerHandler('\\w+', fn, 50).shift()
  t.true(addedHandler.regex.test('zce'))
  t.is(addedHandler.handler, fn)
})

test('compatible-oembed-parser', t => {
  // extract
  t.is(embedParser.extract, embedParser)
  // hasProvider
  t.is(embedParser.hasProvider, embedParser.hasHandler)
  // version
  t.is(embedParser.version, version)
})
