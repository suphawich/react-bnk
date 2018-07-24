const express = require('express');
const cheerio = require('cheerio');
const phantom = require('phantom');
const webpage = require('webpage');

const app = express();
const port = process.env.PORT || 3001;

app.get('/api/hello', (req, res) => {

  (async () => {
    let urls = [
      {name: 'Mewnich', url: 'https://shopee.co.th/Mewnich-BNK48-Debut-Photoset-i.72135979.1326717235'},
      {name: 'Fond', url: 'https://shopee.co.th/Fond-BNK48-Debut-Photoset-i.72135979.1326696192'},
      {name: 'Ratah', url: 'https://shopee.co.th/Ratah-BNK48-Debut-Photoset-i.72135979.1326745869'},
      {name: 'Juné', url: 'https://shopee.co.th/Jun%C3%A9-BNK48-Debut-Photoset-i.72135979.1326702928'},
      {name: 'Natherine', url: 'https://shopee.co.th/Natherine-BNK48-Debut-Photoset-i.72135979.1326724595'},
      {name: 'Bamboo', url: 'https://shopee.co.th/Bamboo-BNK48-Debut-Photoset-i.72135979.1326674889'},
      {name: 'New', url: 'https://shopee.co.th/New-BNK48-Debut-Photoset-i.72135979.1326727106'},
      {name: 'Minmin', url: 'https://shopee.co.th/Minmin-BNK48-Debut-Photoset-i.72135979.1326719713'},
      {name: 'Wee', url: 'https://shopee.co.th/Wee-BNK48-Debut-Photoset-i.72135979.1326751640'},
      {name: 'Cake', url: 'https://shopee.co.th/Cake-BNK48-Debut-Photoset-i.72135979.1326677511'},
      {name: 'Stang', url: 'https://shopee.co.th/Stang-BNK48-Debut-Photoset-i.72135979.1326747842'},
      {name: 'Panda', url: 'https://shopee.co.th/Panda-BNK48-Debut-Photoset-i.72135979.1326741025'},
      {name: 'Phukkhom ', url: 'https://shopee.co.th/Phukkhom-BNK48-Debut-Photoset-i.72135979.1326743932'},
      {name: 'View', url: 'https://shopee.co.th/View-BNK48-Debut-Photoset-i.72135979.1326749768'},
      {name: 'Kheng', url: 'https://shopee.co.th/Kheng-BNK48-Debut-Photoset-i.72135979.1326709931'},
      {name: 'Oom', url: 'https://shopee.co.th/Oom-BNK48-Debut-Photoset-i.72135979.1326733657'},
      {name: 'Niky', url: 'https://shopee.co.th/Niky-BNK48-Debut-Photoset-i.72135979.1326729479'},
      {name: 'Aom', url: 'https://shopee.co.th/Aom-BNK48-Debut-Photoset-i.72135979.1326671986'},
      {name: 'Faii', url: 'https://shopee.co.th/Faii-BNK48-Debut-Photoset-i.72135979.1326683688'},
      {name: 'Myyu', url: 'https://shopee.co.th/Myyu-BNK48-Debut-Photoset-i.72135979.1326722732'},
      {name: 'Maira', url: 'https://shopee.co.th/Maira-BNK48-Debut-Photoset-i.72135979.1326713594'},
      {name: 'Gygee', url: 'https://shopee.co.th/Gygee-BNK48-Debut-Photoset-i.72135979.1326699007'},
      {name: 'Deenee', url: 'https://shopee.co.th/Deenee-BNK48-Debut-Photoset-i.72135979.1326680890'},
      {name: 'Khamin', url: 'https://shopee.co.th/Khamin-BNK48-Debut-Photoset-i.72135979.1326706375'},
      {name: 'Nine', url: 'https://shopee.co.th/Nine-BNK48-Debut-Photoset-i.72135979.1326731632'},
      {name: 'Fifa', url: 'https://shopee.co.th/Fifa-BNK48-Debut-Photoset-i.72135979.1326691828'}
    ]
    let data = [];
    for (const obj of urls) {
      
      let count = 0
      while (count < 10) {
        const instance = await phantom.create();
        const page = await instance.createPage();
        const status = await page.open(obj.url);
        const content = await page.property('content');
  
        let $ = cheerio.load(content)
        let header = $('.shopee-product-info__header__text').text()
        let monthlySales = $('.shopee-product-info__header__sold-count').text().substring(16)
        monthlySales = Number.parseInt(monthlySales)
        await instance.exit();
          
        if (header !== '' && monthlySales != null) {
          data.push({ name: obj.name, header: header, monthlySales: monthlySales, countTimeOut: count })
          break
        }
        count++
      }
          
    }
    return data
  })().then(data => {
    res.send({data: data})
  });
});

const getMonthlySales = () => {

  // url = "https://suphawich.science"

  // request(url, function(error, response, html){

  //   // First we'll check to make sure no errors occurred when making the request

  //   if(!error){
  //     let $ = cheerio.load(html)
  //     let title = "not found"

  //     console.log(response.body)
  //     title = $('div[class=shopee-product-info__header__text]').text()
  //     res.send({data: title})
  //   }
  // })

  // (async () => {
  //   let urls = ["https://shopee.co.th/Mewnich-BNK48-Debut-Photoset-i.72135979.1326717235"]
  //   console.log(urls)
  //   const browser = await puppeteer.launch();
  //   const page = await browser.newPage();

  //   await page.goto("https://shopee.co.th/Mewnich-BNK48-Debut-Photoset-i.72135979.1326717235");
  //   // await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});

  //   // let textContent = "not found"
  //   let textContent = await page.evaluate(() => {
  //     return document.getElementsByClassName('shopee-product-info__header__sold-count')[0].textContent
  //   });

  //   console.log(textContent); /* No Problem Mate */
  //   browser.close();
  //   res.send({data: textContent})
  // })();
}

app.listen(port, () => console.log(`Listening on port ${port}`));