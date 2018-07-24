const express = require('express');
const cheerio = require('cheerio');
const phantom = require('phantom');

const app = express();
const port = process.env.PORT || 3001;

app.get('/api/hello', (req, res) => {

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

  (async () => {
    let urls = {
      Mewnich: 'https://shopee.co.th/Mewnich-BNK48-Debut-Photoset-i.72135979.1326717235'
    }
    const instance = await phantom.create();
    const page = await instance.createPage();
   
    const status = await page.open(urls.Mewnich);
    const content = await page.property('content');
    let $ = cheerio.load(content)
    let title = "not found"

    header = $('.shopee-product-info__header__text').text()
    monthlySales = $('.shopee-product-info__header__sold-count').text()
    res.send({header: header, monthlySales: monthlySales})
    // console.log(content);
   
    await instance.exit();
  })();
});

app.listen(port, () => console.log(`Listening on port ${port}`));