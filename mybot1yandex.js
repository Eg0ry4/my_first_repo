// ==UserScript==
// @name         My first Bot
// @namespace    http://http://inoue.p-host.in
// @version      1.01
// @description  Bot for Yandex
// @author       Kochetov Egor 066
// @match        https://ya.ru/*
// @grant        none
// ==/UserScript==

let yaInput = document.getElementsByName("text")[0];
let yaBtn = document.getElementsByClassName("search3__button")[0];
let links = document.links;
let keywords = ["Купить машину", "BMW e46 купить", "Качественные иномарки"];
let keyword = keywords[getRandom(0, keywords.length)];

if (yaBtn !== undefined) {
  yaInput.value = keyword;
  yaBtn.click();
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
