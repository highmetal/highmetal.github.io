"use strict";

const searchButton = document.getElementById("searchButton");

const searchResult = document.getElementById("searchResult");

let pages = [];

fetch("searchList.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    pages = data;
  });

searchButton.addEventListener("input", function (text) {
  const word = text.value;
  data.forEach(function (page) {
    const newDiv = document.createElement("div");
    newDiv.clasList = "pageLink";

    const newA = document.createElement("a");
    newA.textContent = page.url;

    const newLabel = document.createElement("label");
    newLabel.textContent = page.title;

    newLabel.appendChild(newA);
    newDiv.appendChild(newLabel);
    searchResult.appendChild(newDiv);
  });
});

//コピーライトの年自動更新
document.getElementById("year").textContent = new Date().getFullYear();
