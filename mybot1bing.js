// ==UserScript==
// @name         My first Bot
// @namespace    http://http://inoue.p-host.in
// @version      1.02
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

//Работаем на главной странице
if (bingBtn !== undefined) {
  let i = 0;
  let timerId = setInterval(() => {
    bingInput.value += keyword[i];
    i++;
    if(i == keyword.length) {
      clearInterval(timerId);
      bingBtn.click();
    }
  }, 500)
  //Работаем на странице поисковой системы
  } else if (document.querySelector(".b_scopebar") !== null) {
    let nextPage = true;
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.indexOf("auto.ru") != -1) {
        let link = links[i];
        let nextPage = false;
        console.log("Найден результат " + link);
        setTimeout(() => {
          link.click();
        }, getRandom(1500, 3000));
        break;
      }
    }
    if (document.querySelector(".sb_pagS").innerText == "10") {
      let nextPage = false;
      location.href = "https://www.bing.com/";
    }

    if (nextPage) {
      setTimeout(() => {
        document.querySelector(".sb_pagN").click();
      }, getRandom(1500, 3000))
    }
  }
function getRandom(min,max) {
  return Math.floor(Math.random() * (max - min) + min)
}
