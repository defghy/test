const axios = require('axios');
const cheerio = require('cheerio')
const fs = require('fs');

const req = axios.create({

})

// promise版setTimeout
const waitTime = (interval = 0) => {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  });
}

async function fetchText(url) {
  try {
    const res = await req.get(url);

    const $ = cheerio.load(res.data);
    const chapterTitle = $('.title').text();
    const ps = $('.chaptercontent').children();
    const contents = [];
    for(var i=0, len=ps.length; i<len; i++) {
      const text = $(ps[i]).text();
      contents.push(text)
    }
    if (!contents.join('').trim()) {
      await waitTime(5000);
      return fetchText(url);
    }
    return `${chapterTitle} \n ${contents.join('\n')} \n`;
  } catch(e) {
    console.error(e.message)
  }
}

async function start({ urls = [], txtPath = `./${new Date().getTime()}.txt` }) {
  for (var i = 0, len = urls.length; i<len; i++) {
    const url = urls[i];
    const txt = await fetchText(url);
    fs.appendFileSync(txtPath, txt);
    console.log(`${url} 加载完毕`);
  }
}

module.exports = {
  start
}