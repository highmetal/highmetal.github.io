"use strict";

//時計
const clockElement = document.getElementById("clock");
setInterval(clock, 1000);
clock();

function clock() {
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

//サイト内検索処理
const searchInput = document.getElementById("headerSearchInput");
const searchButton = document.getElementById("searchButton");

//検索ボタンを押したときの処理
searchButton.addEventListener("click", function () {
  //検索文字列を取得
  const word = searchInput.value;
  window.location.href = `search.html?q=${encodeURIComponent(word)}`;
});

//コピーライトの年自動更新
document.getElementById("year").textContent = new Date().getFullYear();
