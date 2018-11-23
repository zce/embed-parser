const embedParser = require('..')

embedParser.hasHandler('https://v.youku.com/v_show/id_XMzkyODgxODM2OA==.html')
// => true

embedParser.hasHandler('https://www.bilibili.com/video/av21536312')
// => true

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

embedParser('https://www.bilibili.com/video/av21536312').then(embed => {
  console.log(embed)
  // =>
  //  {
  //    type: 'video',
  //    version: '1.0',
  //    title: 'Bilibili Video',
  //    provider_name: 'Bilibili',
  //    provider_url: 'https://www.bilibili.com,
  //    html: '<iframe src="http://player.bilibili.com/player.html?aid=21536312" width="640" height="360" frameborder="0" allowfullscreen></iframe>',
  //    width: 640,
  //    height: 360
  //  }
})

embedParser.registerHandler('http://v.zce.me/item-(.+)', matches => new Promise(resolve => {
  resolve({ url: `http://v.zce.me/embed/${matches[1]}` })
}))
embedParser('http://v.zce.me/item-fake-slug').then(embed => {
  console.log(embed)
  // =>
  //  {
  //    url: 'http://v.zce.me/embed/fake-slug'
  //  }
})
