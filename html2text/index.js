const path = require('path');
const engine = require('./src/index.js');

const renderTemplate = ({ template, data }) => {
  return template.replace(/(\{\{[^\{\}]+\}\})/ig, function(matched) {
    const vaName = matched.split('{{').join('').split('}}').join('');

    return data[vaName];
  })
};

const createUrls = () => {
  const template = 'https://m.9shuyuan.com/107929/read_{{readNo}}.html';
  const min = 1;
  const max = 205;  // 205
  const urls = [];
  for (var i = min; i<=max; i++) {
    urls.push(renderTemplate({ template, data: { readNo: i } }))
  }

  return urls;
};

engine.start({
  urls: createUrls(),
  txtPath: path.resolve('./永不解密.txt')
})