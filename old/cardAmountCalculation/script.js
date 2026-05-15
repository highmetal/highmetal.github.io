"use strict";

const table = document.getElementById("table");
const form = document.getElementById("form");
const capture = document.getElementById("capture");

// ローカルストレージから読み込み
let cardList = JSON.parse(localStorage.getItem("cardList") || "[]");

function saveToLocalStorage() {
  localStorage.setItem("cardList", JSON.stringify(cardList));
}

function updateAllCard() {
  let totalQuantity = 0;

  document.querySelectorAll("#table tr[data-id]").forEach((row) => {
    const checkbox = row.querySelector("input[type='checkbox']");
    if (checkbox.checked) {
      const quantity = Number(row.cells[2].textContent.replace(/,/g, ""));
      totalQuantity += quantity;
    }
  });

  document.getElementById("sumQuantity").textContent =
    `総枚数: ${totalQuantity.toLocaleString()}枚`;
}

function updateSum() {
  let sum = 0;
  document.querySelectorAll("tr[data-amount]").forEach((row) => {
    const checkbox = row.querySelector("input[type='checkbox']");
    if (checkbox.checked) sum += Number(row.dataset.amount);
  });
  document.getElementById("sumAmount").textContent =
    `総計: ${sum.toLocaleString()}円`;
}

// テーブルにカードを表示する
function addCardToTable(card) {
  const row = table.insertRow();
  row.dataset.id = card.id;
  row.dataset.amount = card.amount * card.quantity;
  row.dataset.quantity = card.quantity;

  const nameCell = row.insertCell();
  const amountCell = row.insertCell();
  const quantityCell = row.insertCell();
  const subtotalCell = row.insertCell();
  const checkCell = row.insertCell();
  const noteCell = row.insertCell();
  const editCell = row.insertCell();
  const deleteCell = row.insertCell();
  const handleCell = row.insertCell();

  editCell.classList.add("edit-cell", "no-shot");
  deleteCell.classList.add("delete-cell", "no-shot");
  // handleCell.classList.add("no-shot");

  nameCell.textContent = card.name;
  amountCell.textContent = card.amount.toLocaleString();
  quantityCell.textContent = card.quantity;
  subtotalCell.textContent = (card.amount * card.quantity).toLocaleString();

  // チェックボックス
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = true;
  checkbox.addEventListener("change", () => {
    row.classList.toggle("unchecked-row", !checkbox.checked);
    updateSum();
    updateAllCard();
  });
  checkCell.appendChild(checkbox);

  // 備考
  noteCell.textContent = card.note;

  // 編集ボタン
  const editBtn = document.createElement("button");
  editBtn.textContent = "編集";
  editCell.appendChild(editBtn);

  // 削除ボタン
  const delBtn = document.createElement("button");
  delBtn.textContent = "×";
  deleteCell.appendChild(delBtn);

  //並び替えバー
  handleCell.textContent = "≡";
  handleCell.classList.add("handle", "no-shot");

  // 編集機能
  let editing = false;
  editBtn.addEventListener("click", () => {
    if (!editing) {
      row.classList.add("editing");
      nameCell.innerHTML = `<input type="text" value="${nameCell.textContent}">`;
      amountCell.innerHTML = `<input type="number" min="0" value="${amountCell.textContent.replace(
        /,/g,
        "",
      )}" class="amount">`;
      quantityCell.innerHTML = `<input type="number" min="1" value="${quantityCell.textContent}" class="quantity">`;
      noteCell.innerHTML = `<input type="text" value="${noteCell.textContent}">`;
      editBtn.textContent = "保存";
      editing = true;
    } else {
      const newName = nameCell.querySelector("input").value.trim();
      const newAmountStr = amountCell.querySelector("input").value.trim();
      const newQuantityStr = quantityCell.querySelector("input").value.trim();
      const newnote = noteCell.querySelector("input").value.trim();

      const newAmount = Number(newAmountStr);
      const newQuantity = Number(newQuantityStr);

      if (newName === "") {
        showModal({
          title: "注意",
          message: `カード名が空です`,
          type: "close",
        });
        return;
      }
      if (newAmountStr === "") {
        showModal({
          title: "注意",
          message: `値段が未入力です`,
          type: "close",
        });
        return;
      }
      if (newQuantityStr === "") {
        showModal({
          title: "注意",
          message: `枚数が未入力です`,
          type: "close",
        });
        return;
      }

      nameCell.textContent = newName;
      amountCell.textContent = newAmount.toLocaleString();
      quantityCell.textContent = newQuantity;
      subtotalCell.textContent = (newAmount * newQuantity).toLocaleString();
      noteCell.textContent = newnote;

      // 配列の更新
      const index = cardList.findIndex((c) => c.id === card.id);
      cardList[index] = {
        id: card.id,
        name: newName,
        amount: newAmount,
        quantity: newQuantity,
        note: newnote,
      };
      saveToLocalStorage();

      row.dataset.amount = newAmount * newQuantity;
      row.dataset.quantity = newQuantity;
      editBtn.textContent = "編集";
      editing = false;
      row.classList.remove("editing");
      updateSum();
      updateAllCard();
    }
  });

  // 削除
  // delBtn.addEventListener("click", () => {
  //   if (confirm(`リストから”${card.name}”を削除してもよろしいですか？`)) {
  //     row.remove();
  //     cardList = cardList.filter((c) => c.id !== card.id);
  //     saveToLocalStorage();
  //     updateSum();
  //   }
  // });

  delBtn.addEventListener("click", async () => {
    const ok = await showModal({
      title: "削除確認",
      message: `リストから「${card.name}」を削除してもよろしいですか？`,
      type: "yesno",
    });
    if (!ok) return;

    row.remove();
    cardList = cardList.filter((c) => c.id !== card.id);
    saveToLocalStorage();
    updateSum();
    updateAllCard();
  });

  updateSum();
  updateAllCard();
}

// ページ再読み込み
cardList.forEach(addCardToTable);

// フォーム送信時の処理
form.onsubmit = (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const amountInput = document.getElementById("amount");
  const quantityInput = document.getElementById("quantity");
  const noteInput = document.getElementById("kari");
  const message = document.getElementById("message");

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value.trim());
  const quantity = Number(quantityInput.value.trim());
  const note = noteInput.value.trim();

  if (name === "") {
    messageDisplay("カード名が入力されていません。");
    return;
  }
  if (Number.isNaN(amount) || amount < 0) {
    messageDisplay("値段は0円以上で入力してください。");
    return;
  }
  if (!Number.isInteger(quantity) || quantity < 0) {
    messageDisplay("枚数は0以上で入力してください。");
    return;
  }

  message.textContent = "";

  // const newCard = { id: Date.now(), name, amount, quantity, note };
  const newCard = {
    id: crypto.randomUUID(),
    name,
    amount,
    quantity,
    note,
  };

  clearBtn.style.display = "none";

  cardList.push(newCard);
  saveToLocalStorage();
  addCardToTable(newCard);
  form.reset();

  function messageDisplay(msg) {
    message.textContent = msg;
    setTimeout(() => {
      message.textContent = "";
    }, 3000);
  }
};

//スクリーンショット
//   capture.addEventListener("click", () => {
//     // 編集中チェック
//     if (document.querySelector("tr.editing")) {
//       alert("編集中はスクリーンショットできません。保存してください。");
//       return;
//     }

//     if (window.confirm(`リストをダウンロードしますか？(png)`)) {
//       const fileName =
//         prompt("ファイル名を入力してください", "list") || "list";

//       const target = document.getElementById("target");

//       target.classList.add("screenshot-mode");

//       html2canvas(target, {
//         scale: 2,
//         backgroundColor: "#ffffff",
//       }).then((canvas) => {
//         const link = document.createElement("a");
//         link.download = `${fileName}.png`;
//         link.href = canvas.toDataURL();
//         link.click();

//         target.classList.remove("screenshot-mode");
//       });
//     }
//   });

capture.addEventListener("click", async () => {
  if (document.querySelector("tr.editing")) {
    await showModal({
      title: "注意",
      message: "編集中はスクリーンショットできません。保存してください。",
      type: "close",
    });
    return;
  }
  if (cardList.length === 0) {
    await showModal({
      title: "注意",
      message: "リストにカードがありません。リストにカードを追加してください。",
      type: "close",
    });
    return;
  }

  const ok = await showModal({
    title: "確認",
    message: "リストをダウンロードしますか？(png)",
    type: "yesno",
  });
  if (!ok) return;

  const fileName = prompt("ファイル名を入力してください", "list") || "list";
  const target = document.getElementById("target");
  target.classList.add("screenshot-mode");

  html2canvas(target, {
    scale: 2,
    backgroundColor: "#ffffff",
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = canvas.toDataURL();
    link.click();

    target.classList.remove("screenshot-mode");
  });
});

//並び替え
$(function () {
  $("#table").sortable({
    items: "tr:not(tr:first-child)",
    handle: ".handle",
    axis: "y",
    stop: function () {
      const oldList = [...cardList];
      const newList = [];

      $("#table tr[data-id]").each(function () {
        const id = this.dataset.id;
        const card = oldList.find((c) => c.id === id);
        if (card) newList.push(card);
      });

      cardList = newList;
      saveToLocalStorage();
    },
  });
});

//一括削除
//一括削除
const allDelete = document.getElementById("allDelete");
allDelete.addEventListener("click", (event) => {
  event.preventDefault();
  allClear();
});

//   function allClear() {
//     if (!confirm("リストからカードをすべて削除しますか？")) return;

//     //データ削除
//     localStorage.removeItem("cardList");
//     cardList = [];

//     //テーブルの行を削除
//     while (table.rows.length > 1) {
//       table.deleteRow(1);
//     }

//     updateSum();
//   }

function allClear() {
  if (cardList.length === 0) {
    showModal({
      title: "注意",
      message: "削除するカードがありません。",
      type: "close",
    });
    return;
  }
  showModal({
    title: "削除確認",
    message: "リストからカードをすべて削除しますか？",
    type: "yesno",
  }).then((ok) => {
    if (!ok) return;

    // データ削除
    localStorage.removeItem("cardList");
    cardList = [];

    // テーブルの行を削除
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    updateSum();
    updateAllCard();
  });
}

//モーダル表示
function showModal({ title = "確認", message = "", type = "yesno" }) {
  return new Promise((resolve) => {
    const modal = document.querySelector(".modal");
    const modalTitle = modal.querySelector(".modalTitle");
    const modalMessage = modal.querySelector(".modalMessage");
    const yesButton = modal.querySelector(".modalButtonT");
    const noButton = modal.querySelector(".modalButtonF");
    const closeButton = modal.querySelector(".modalButtonOut");

    // タイトルとメッセージ
    modalTitle.textContent = title;
    modalMessage.textContent = message;

    // ボタン表示制御
    yesButton.style.display = type === "yesno" ? "inline-block" : "none";
    noButton.style.display = type === "yesno" ? "inline-block" : "none";
    closeButton.style.display = type === "close" ? "inline-block" : "none";

    modal.style.display = "flex";

    const cleanUp = () => {
      modal.style.display = "none";
      yesButton.removeEventListener("click", onYes);
      noButton.removeEventListener("click", onNo);
      closeButton.removeEventListener("click", onClose);
    };

    const onYes = () => {
      cleanUp();
      resolve(true);
    };

    const onNo = () => {
      cleanUp();
      resolve(false);
    };

    const onClose = () => {
      cleanUp();
      resolve();
    };

    if (type === "yesno") {
      yesButton.addEventListener("click", onYes);
      noButton.addEventListener("click", onNo);
    } else if (type === "close") {
      closeButton.addEventListener("click", onClose);
    }
  });
}

//リストコピー
function listCopy() {
  if (cardList.length === 0) {
    showModal({
      title: "注意",
      message: "コピーするカードがありません。",
      type: "close",
    });
    return;
  }

  const exportData = cardList.map((card) => ({
    na: card.name,
    am: card.amount,
    qu: card.quantity,
    no: card.note,
  }));
  const json = JSON.stringify(exportData);

  navigator.clipboard
    .writeText(json)
    .then(() => {
      showModal({
        title: "コピー完了",
        message: "カードリスト(JSON)をコピーしました。",
        type: "close",
      });
    })
    .catch(() => {
      showModal({
        title: "エラー",
        message: "コピーに失敗しました。",
        type: "close",
      });
    });
}

//リスト読み込み
async function pasteList() {
  let text;

  try {
    text = await navigator.clipboard.readText();
  } catch {
    showModal({
      title: "エラー",
      message: "クリップボードの読み取りに失敗しました。",
      type: "close",
    });
    return;
  }

  if (!text) {
    showModal({
      title: "注意",
      message: "クリップボードにデータがありません。",
      type: "close",
    });
    return;
  }

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    showModal({
      title: "エラー",
      message: "クリップボードのJSON形式が正しくありません。",
      type: "close",
    });
    return;
  }

  if (!Array.isArray(data)) {
    showModal({
      title: "エラー",
      message: "カードデータではありません。",
      type: "close",
    });
    return;
  }

  console.log(data);

  // data.forEach((card) => {
  //   //   if (!card.id)
  //   card.id = crypto.randomUUID();

  //   cardList.push(card);
  //   addCardToTable(card);
  // });

  data.forEach((item) => {
    const card = {
      id: crypto.randomUUID(),
      name: item.na,
      amount: item.am,
      quantity: item.qu,
      note: item.no,
    };

    cardList.push(card);
    addCardToTable(card);
  });

  saveToLocalStorage();

  showModal({
    title: "読み込み完了",
    message: "クリップボードからカードを追加しました。",
    type: "close",
  });
}

//トップへ戻るボタン
const topBack = document.getElementById("topBack");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    topBack.style.visibility = "visible";
  } else {
    topBack.style.visibility = "hidden";
  }
});

$(function () {
  var pagescroll = $("#topBack").click(function () {
    $("body, html").animate({ scrollTop: 0 }, 1000);
    return false;
  });
});

const nameInput = document.getElementById("name");
const clearBtn = document.getElementById("clearBtn");

nameInput.addEventListener("input", () => {
  clearBtn.style.display = nameInput.value ? "block" : "none";
});

clearBtn.addEventListener("click", () => {
  nameInput.value = "";
  clearBtn.style.display = "none";
  nameInput.focus();
});
