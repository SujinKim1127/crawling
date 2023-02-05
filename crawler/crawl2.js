const axios = require("axios");
const cheerio = require("cheerio");
const url = 'https://www.thinkcontest.com';

async function main() {
  const resp = await axios.get(url + "/Contest/CateField.html");

  const $ = cheerio.load(resp.data); 
  const elements = $(".contest-banner-list li"); 
//   console.log(elements);
  const title = [];
  elements.each((idx, el) => {
    console.log($(el).text());
    if ($(el).text() !== "") {
      title.push($(el).text());
    }
  });

  const hrefarr = [];

  $(".contest-banner-list")
    .find("li")
    .each(function (index, ele) {
      var ahref = $(this).find("a").eq(0).attr("href");
      console.log("href",  ahref);
      if (ahref !== undefined) {
        hrefarr.push(ahref);
      }
      console.log('arr', hrefarr)
      console.log("***");
    });

  for (let i = 0; i < hrefarr.length; i++) {
    if (hrefarr[i][1] === "C") {
      console.log("title: ", title[i]);
      const hrefresp = await axios.get(
        url + hrefarr[i]
      );
      hrefContents(hrefresp);
    } 
  }
}

main();

async function hrefContents(resp) {
  const $ = cheerio.load(resp.data);
  const elements = $(".contest-detail div"); 
  elements.each((idx, el) => {
    console.log($(el).text());
  });
}
