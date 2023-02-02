const axios = require("axios");
const cheerio = require("cheerio");

async function main() {
  const resp = await axios.get("http://www.detizen.net/activity/");

  const $ = cheerio.load(resp.data); 
  const elements = $(".widget-contents a"); 
  // console.log(elements);
  const title = [];
  elements.each((idx, el) => {
    // console.log($(el).text());
    if ($(el).text() !== "") {
      title.push($(el).text());
    }
  });

  const hrefarr = [];

  $(".widget-contents")
    .find("li")
    .each(function (index, ele) {
      var dt1 = $(this).find("h4").eq(0);
      // console.log("href", dt1.find("a").attr("href"));
      if (dt1.find("a").attr("href") !== undefined) {
        hrefarr.push(dt1.find("a").attr("href"));
      }
      // console.log('arr', hrefarr)
      // console.log("***");
    });

  for (let i = 0; i < hrefarr.length; i++) {
    if (hrefarr[i][0] === "?") {
      console.log("title: ", title[i]);
      const hrefresp = await axios.get(
        "http://www.detizen.net/activity/" + hrefarr[i]
      );
      hrefContents(hrefresp);
    } else {
      console.log("title: ", title[i]);
      const slice = hrefarr[i].slice(10);
      const hrefresp = await axios.get(
        "http://www.detizen.net/activity/" + slice
      );
      hrefContents(hrefresp);
    }
  }
}

main();

async function hrefContents(resp) {
  const $ = cheerio.load(resp.data);
  const elements = $(".summary-info pre"); 
  elements.each((idx, el) => {
    console.log($(el).text());
  });
}
