const axios = require("axios");
const cheerio = require("cheerio");
const url = "http://campusmon.jobkorea.co.kr";

async function main() {
  const resp = await axios.get(url + "/Contest/List");

  const $ = cheerio.load(resp.data);
  const elements = $(".infoAllList tr");
  const title = [];
  elements.each((idx, el) => {
    console.log("text", $(el).text());
    if ($(el).text() !== "") {
      title.push($(el).text());
    }
  });

  const hrefarr = [];

  $(".rank")
    .find("td")
    .each(function (index, ele) {
      var dt1 = $(this).find("p").eq(0);
      console.log("href", dt1.find("a").attr("href"));
      if (dt1.find("a").attr("href") !== undefined) {
        hrefarr.push(dt1.find("a").attr("href"));
      }
      //   console.log('arr', hrefarr)
      //   console.log("***");
    });

  for (let i = 0; i < hrefarr.length; i++) {
    console.log(i, "---------------------------------------");
    const hrefresp = await axios.get(
      url + hrefarr[i]
    );
    hrefContents(hrefresp);
  }
}

main();

const srcarr = [];

async function hrefContents(resp) {
  const $ = cheerio.load(resp.data);
  $(".viewInfoMid")
    .find("div")
    .each(function (index, ele) {
      var dt1 = $(this).find("div").eq(0);
      console.log("src", dt1.find("iframe").attr("src"));
      if (dt1.find("iframe").attr("src") !== undefined) {
        srcarr.push(dt1.find("iframe").attr("src"));
      }
    });

  for (let i = 0; i < srcarr.length; i++) {
    console.log(i, "---------------------------------------");
    const srcresp = await axios.get(
      url + srcarr[i]
    );
    htmlContents(srcresp);
  }
}

async function htmlContents(resp) {
  const $ = cheerio.load(resp.data);
  const elements = $("body");
  const title = [];
  elements.each((idx, el) => {
    console.log("text", $(el).text());
  });
}
