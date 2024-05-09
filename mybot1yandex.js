// ==UserScript==
// @name         My first Bot Yandex
// @namespace    http://http://inoue.p-host.in
// @version      1.02
// @description  Bot for Yandex
// @author       Kochetov Egor 066
// @match        https://ya.ru/*
// @match        https://auto.ru/*
// @grant        none
// ==/UserScript==

let yaInput = document.getElementsByName("text")[0];
let yaBtn = document.getElementsByClassName("search3__button")[0];
let links = document.links;
let keywords = ["Купить машину", "BMW e46 купить", "Раритетные иномарки в Москве", "Купить мотоцикл Harley-Davidson", "Купить мотоцикл типа cafe racer"];
let keyword = keywords[getRandom(0, keywords.length)];
let mouseClick = new MouseEvent("click");

if (yaBtn !== undefined) {
  let i = 0;
  let timerId = setInterval(() => {
    yaInput.click();
    yaInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      yaBtn.click();
    }
  }, getRandom(200, 400))
  //Работа на целевом сайте
  } else if (location.hostname == "auto.ru") {
    let linkIndex = getRandom(0, links.length);
    let localLink = links[linkIndex];
    setInterval(() => {

      if (getRandom(0, 101) > 50) {
        location.href = "https://ya.ru/";
      }

      if (links.length == 0) {
        location.href = "https://auto.ru/";
      }

      if (localLink.href.includes("auto.ru")) {
        localLink.click();
      }
    }, getRandom(3000, 5000))
    console.log("Мы на нашем целевом сайте");
  }
//Работаем на странице поисковой системы
else if ((document.querySelector(".HeaderDesktopNavigation") !== null)) {
  let nextPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("auto.ru") != -1) {
      let link = links[i];
      let nextPage = false;
      console.log("Найден результат " + link);
      setTimeout(() => {
        link.click();
      }, getRandom(2000, 4000))
      break;
    }
  }
  let elementExist = setInterval(() => {
    let elem = document.querySelector(".Pager-Item_current");

    if (elem !== null ) {
      if (document.querySelector(".Pager-Item_current").innerText == "7") {
        let nextPage = false;
        location.href = "https://ya.ru/";
      }
      clearInterval(elementExist);
    }
  }, 100);

  if (nextPage) {
    setTimeout(() => {
      document.querySelector(".Pager-Item_type_next").click();
    }, getRandom(2000, 4000))
  }
}
function getRandom(min,max) {
  return Math.floor(Math.random() * (max - min) + min)
}
