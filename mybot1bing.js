// ==UserScript==
// @name         My first Bot
// @namespace    http://http://inoue.p-host.in
// @version      1.04
// @description  Bot for Bing
// @author       Kochetov Egor 066
// @match        https://www.bing.com/*
// @match        https://auto.ru/*
// @match        https://motoreforma.com/*
// @match        https://ironduke.ru/*
// @grant        none
// ==/UserScript==

let bingInput = document.getElementsByName("q")[0];
let bingBtn = document.getElementsByClassName("search")[0];
let links = document.links;
let sites = {
  "auto.ru": ["Купить машину", "BMW e46 купить", "Раритетные иномарки в Москве", "Купить мотоцикл Harley-Davidson", "Купить мотоцикл типа cafe racer"],
  "motoreforma.com": ["Прошивки для CAN-AM BRP", "вариатор CVTech CAN-AM", "Тюнинг Maverick X3"],
  "ironduke.ru": ["ТО автомобилей в Измайлово", "Мастерская Iron Duke", "Замена датчиков давления автомобиля"],
}
let sitesKeys = Object.keys(sites);
let site = sitesKeys[getRandom(0, sitesKeys.length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let mouseClick = new MouseEvent("click");

if (bingBtn !== undefined) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.bing.com") {
  site = getCookie("site");
} else {
  site = location.hostname;
}

//Работаем на главной странице
if (bingBtn !== undefined) {
  let i = 0;
  //bingInput.focus();
  //bingInput.dispatchEvent(mouseClick);
  //bingInput.value = keyword;
  //bingBtn.click();
  // Иная вариация
  let timerId = setInterval(() => {
    bingInput.click();
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      bingBtn.click();
    }
  }, getRandom(300, 500))
  //Работаем на целевом сайте
  } else if (location.hostname == site) {
    setInterval(() => {
      let linkIndex = getRandom(0, links.length);
      let localLink = links[linkIndex];

      if (getRandom(0, 101) > 70) {
        location.href = "https://www.bing.com/";
      }
      if (links.length == 0) {
        location.href = site;
      }
      if (localLink.href.includes(site)) {
        localLink.click();
      }
    }, getRandom(3000, 5000))
    console.log("Мы на целевом сайте");
  }
//Работаем на странице поисковой системы
else if (document.querySelector(".b_scopebar") !== null) {
  //привязка к scopebar позволяет избежать многих ошибок с дальнейшей работой бота на выбранном ресурсе
  let nextPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf(site) != -1) {
      let link = links[i];
      let nextPage = false;
      console.log("Найден результат " + link);
      setTimeout(() => {
        link.click();
      }, getRandom(2000, 3000));
      break;
    }
  }
  let elementExist = setInterval(() => {
    let elem = document.querySelector(".sb_pagS");

    if (elem !== null ) {
      if (document.querySelector(".sb_pagS").innerText == "10") {
        let nextPage = false;
        location.href = "https://www.bing.com/";
      }
      clearInterval(elementExist);
    }
  }, 100);


  if (nextPage) {
    setTimeout(() => {
      document.querySelector(".sb_pagN").click();
    }, getRandom(3000, 4500))
  }
}
function getRandom(min,max) {
  return Math.floor(Math.random() * (max - min) + min)
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
