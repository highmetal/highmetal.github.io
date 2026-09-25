"use strict";

//入力欄
const inputText = document.getElementById("input-item");
//クリップボードから追加ボタン
const pasteButton = document.getElementById("paste-button");
//オールデリートボタン
const allDelete = document.getElementById("all-delete-button");
//追加ボタン（非表示）
const addButton = document.getElementById("add-button");

//追加されるリスト（UI）
const list = document.getElementById("list");

//データ上のリスト用
let lists = [];

//再読み込み時にlocalStorageから要素を取得
window.addEventListener("load", function () {
  lists = JSON.parse(localStorage.getItem("buymemo") || "[]");
  renderList();
});

//クリップボードから追加ボタンが押された時の処理
pasteButton.addEventListener("click", function () {
  //非同期のクリップボードAPIでクリップボードの内容を取得
  navigator.clipboard.readText().then(function (clipText) {
    //改行ごとに分割して変数に代入する処理
    const lines = clipText.split(/\r?\n/);
    //分割した変数を一つずつリストに追加
    lines.forEach(function (e) {
      createItemData(e);
    });
  });
});

//オールデリートボタンが押された時の処理
allDelete.addEventListener("click", function () {
  //listに要素が何もないなら
  if (list.innerHTML.trim() === "") {
    alert("削除する項目がありません。");
    return;
  }
  //最終確認
  if (!confirm("本当？")) {
    return;
  }
  //localStorageもろとも消す
  localStorage.removeItem("buymemo");
  lists = null;
  renderList();
});

//追加ボタンを押した時の処理（追加ボタンは非表示でフォームのEnterから実行される）
addButton.addEventListener("click", function () {
  //入力欄が空か空白のみの場合は追加しない
  if (inputText.value === "" || inputText.value.trim() === "") {
    return;
  }
  //要素をデータとして作成
  createItemData(inputText.value);
  //入力欄初期化
  inputText.value = "";
});

//データとして要素を作成する関数
function createItemData(itemName) {
  const item = {
    uuid: crypto.randomUUID(),
    name: itemName,
    check: false,
    null: false,
  };
  lists = JSON.parse(localStorage.getItem("buymemo") || "[]");
  //配列に追加
  lists.push(item);
  //localStorageに追加
  localStorage.setItem("buymemo", JSON.stringify(lists));
  //データに基づきリストに追加
  addItem(item.uuid, item.check, item.null, item.name);
}

//要素をリストに追加する関数
function addItem(uuid, isCheck, isNull, itemName) {
  //div部分
  const newDiv = document.createElement("div");
  newDiv.className = "items";

  //チェックボックス部分
  const newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.className = "new-checkbox";
  //押された時の処理
  newCheckbox.addEventListener("click", function () {
    //localStorage側更新
    changeList(uuid, "check", newCheckbox.checked);
  });
  //isCheckがtrueなら初期値チェックつける
  if (isCheck) {
    newCheckbox.checked = true;
  }

  //除外ボタン（除）部分
  const newNullButton = document.createElement("button");
  newNullButton.textContent = "除";
  newNullButton.className = "null-button";
  //押された時の処理
  newNullButton.addEventListener("click", function () {
    //クラス名をトグルで変更
    newDiv.classList.toggle("null");
    //localStorage側更新
    changeList(uuid, "null", newDiv.classList.contains("null"));
  });
  //isNullがtrueなら要素に初期値で除外クラスをつける
  if (isNull) {
    newDiv.classList.toggle("null");
  }

  //追加した要素名部分
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.value = itemName;
  newInput.size = 30;
  newInput.className = "new-item-input";
  //要素の名前変更時
  newInput.addEventListener("input", function () {
    //変更部分を更新
    changeList(uuid, "name", newInput.value);
  });

  //削除ボタン（×）部分
  const newDeleteButton = document.createElement("button");
  newDeleteButton.textContent = "×";
  newDeleteButton.className = "delete-button";
  //押された時の処理
  newDeleteButton.addEventListener("click", function () {
    //削除確認
    if (!confirm(`${newInput.value}を消すが本当？`)) {
      return;
    }

    //divもろとも消す
    newDiv.remove();

    //localStorageからも削除
    let newlist = JSON.parse(localStorage.getItem("buymemo"));
    newlist = newlist.filter((i) => i.uuid !== uuid);
    localStorage.setItem("buymemo", JSON.stringify(newlist));
    //変更後の新しいlistに上書き
    lists = newlist;
  });

  //各要素を親要素に追加
  newDiv.appendChild(newCheckbox);
  newDiv.appendChild(newNullButton);
  newDiv.appendChild(newInput);
  newDiv.appendChild(newDeleteButton);
  list.appendChild(newDiv);
}

//localStorageを更新する関数
function changeList(uuid, key, value) {
  let newlist = JSON.parse(localStorage.getItem("buymemo"));
  const updatelist = newlist.map((list) => {
    if (list.uuid === uuid) {
      //key部分だけ変更しそれ以外は変更しない
      return { ...list, [key]: value };
    }
    //一致しない要素はそのまま
    return list;
  });
  //localStorage上書き
  localStorage.setItem("buymemo", JSON.stringify(updatelist));
  lists = updatelist;
}

//localStorageにある要素を表示
function renderList() {
  list.innerHTML = "";
  if (lists === null) {
    return;
  }
  lists.forEach(function (e) {
    addItem(e.uuid, e.check, e.null, e.name);
  });
}

//フッター作成
const footer = document.getElementById("footer");
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
