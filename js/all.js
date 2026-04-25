"use strict";

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

//検索ボタンを押したときの処理
searchButton.addEventListener("click", function () {
  //検索文字列を取得
  const word = searchInput.value;
  window.location.href = `search.html?q=${encodeURIComponent(word)}`;
});

//コピーライトの年自動更新
document.getElementById("year").textContent = new Date().getFullYear();
