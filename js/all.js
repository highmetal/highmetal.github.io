"use strict";

//DOM読み込みを待つ
window.addEventListener("DOMContentLoaded", function () {
  //ヘッダー作成
  const header = document.getElementById("header");
  if (!header) return;
  //ロゴ部分
  const logoDiv = document.createElement("div");
  logoDiv.id = "logo";
  const logoLink = document.createElement("a");
  logoLink.href = "/";
  const logoImg = document.createElement("img");
  logoImg.src = "/image/high.ico";
  logoImg.alt = "ロゴ";

  logoLink.appendChild(logoImg);
  logoDiv.appendChild(logoLink);
  header.appendChild(logoDiv);

  //時計部分
  const clockDiv = document.createElement("div");
  clockDiv.className = "header-clock";
  const clockP = document.createElement("p");
  clockP.className = "clock";
  clockP.id = "clock";
  clockP.textContent = "9999/99/99 99:99:99";

  clockDiv.appendChild(clockP);
  header.appendChild(clockDiv);

  //リンク部分
  const headerLinks = document.createElement("div");
  headerLinks.id = "header-links";
  // 自己紹介リンク
  const aboutSpan = document.createElement("span");
  aboutSpan.className = "header-link";
  const aboutLink = document.createElement("a");
  aboutLink.href = "/src/aboutMe/index.html";
  aboutLink.textContent = "自己紹介";

  aboutSpan.appendChild(aboutLink);
  headerLinks.appendChild(aboutSpan);

  //サイト内検索部分
  const searchDiv = document.createElement("div");
  searchDiv.className = "header-search";

  const searchSpan = document.createElement("span");
  searchSpan.className = "search";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "サイト内検索";
  searchInput.className = "header-search-input";
  searchInput.id = "headerSearchInput";

  const searchButton = document.createElement("button");
  searchButton.className = "search-button";
  searchButton.id = "searchButton";
  searchButton.textContent = "検索";

  searchSpan.appendChild(searchInput);
  searchSpan.appendChild(searchButton);
  searchDiv.appendChild(searchSpan);
  headerLinks.appendChild(searchDiv);

  header.appendChild(headerLinks);

  //フッター作成
  const footer = document.getElementById("footer");
  if (!footer) return;
  //コピーライト記号部分
  const copyP = document.createElement("p");
  const copyText = document.createTextNode("\u00A9");
  copyP.appendChild(copyText);
  //年部分
  const spanYear = document.createElement("span");
  spanYear.id = "year";
  spanYear.textContent = new Date().getFullYear();
  copyP.appendChild(spanYear);
  //コピーライト部分
  const brandText = document.createTextNode(" highmetal All rights reserved.");
  copyP.appendChild(brandText);

  footer.appendChild(copyP);

  //ナビゲーション部分
  const nav = document.createElement("nav");
  const ul = document.createElement("ul");
  const li = document.createElement("li");

  const a = document.createElement("a");
  a.href = "/about.html";
  a.textContent = "このサイトについて";

  li.appendChild(a);
  ul.appendChild(li);
  nav.appendChild(ul);
  footer.appendChild(nav);

  //時計開始
  setInterval(clock, 1000);
  clock();

  //サイト内検索処理
  const headerSearchInput = document.getElementById("headerSearchInput");
  const headersearchButton = document.getElementById("searchButton");
  if (headerSearchInput && searchButton) {
    //検索ボタンを押したときの処理
    headersearchButton.addEventListener("click", function () {
      //検索文字列を取得
      const word = headerSearchInput.value;
      window.location.href = `/search.html?q=${encodeURIComponent(word)}`;
    });
  }
});

//時計
function clock() {
  const clockElement = document.getElementById("clock");
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minut = date.getMinutes();
  const sec = date.getSeconds();
  //文字列作成
  clockElement.textContent = `
  ${year}/${formatTwoDigits(month)}/${formatTwoDigits(day)}
  ${formatTwoDigits(hour)}:${formatTwoDigits(minut)}:${formatTwoDigits(sec)}
  `;
}

//2桁文字列型変換
function formatTwoDigits(value) {
  return String(value).padStart(2, "0");
}
