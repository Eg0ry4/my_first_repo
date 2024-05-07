// ==UserScript==
// @name         My first Bot
// @namespace    http://http://inoue.p-host.in
// @version      1.01
// @description  Bot for Bing
// @author       Kochetov Egor 066
// @match        https://www.bing.com/*
// @grant        none
// ==/UserScript==

let bingInput = document.getElementsByName("q")[0];
let bingBtn = document.getElementsByClassName("search")[0];
let links = document.links;
let keywords = ["Купить машину", "BMW e46 купить", "Качественные иномарки"];
let keyword = keywords[getRandom(0, keywords.length)];

if (bingBtn !== undefined) {
  bingInput.value = keyword;
  bingBtn.click();
} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("auto.ru") != -1) {
      let link = links[i];
      console.log("Найден результат " + link);
      link.click();
      break;
    }
  }
}
function getRandom(min,max) {
  return Math.floor(Math.random() * (max - min) + min)
}
