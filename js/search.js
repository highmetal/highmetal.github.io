"use strict";

const searchResult = document.getElementById("searchResult");
const searchResultNum = document.getElementById("searchResultNum");
const searchInput = document.getElementById("searchInput");

let pages = [];

//検索文字列取得
const parms = new URLSearchParams(window.location.search);
let word = parms.get("q") || "";
//検索ボックスに検索文字列を入れる
searchInput.value = word;

//検索結果のjson読み込み
fetch("searchList.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    pages = data;
    searchRender();
  });

//メインの検索テキストボックスからの検索
searchInput.addEventListener("input", function () {
  searchResult.innerHTML = "";
  word = searchInput.value;
  searchRender();
});

//検索結果表示
function searchRender() {
  let hitCount = 0;
  pages.forEach(function (page) {
    //ヒットしたなら表示
    if (page.tags.includes(word.toLowerCase())) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("page-link");

      const newA = document.createElement("a");
      newA.href = page.url;
      newA.textContent = page.title;
      newA.target = "_blank";

      newDiv.appendChild(newA);
      searchResult.appendChild(newDiv);
      hitCount++;
    }
  });
  //ヒットが一つもないなら
  if (hitCount === 0) {
    const newP = document.createElement("p");
    newP.textContent = "検索結果はありません。";
    searchResult.appendChild(newP);
  }
  searchResultNum.textContent = `${hitCount}件の結果`;
}
