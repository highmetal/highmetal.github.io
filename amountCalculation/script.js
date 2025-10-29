"use stript";

const table = document.getElementById("table");
let sum = 0;

document.getElementById("form").onsubmit = function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const amount = parseInt(document.getElementById("amount").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  if (name === "") {
    document.getElementById("message").textContent =
      "商品名が入力されていません。";
    return;
  }
  if (Number.isNaN(amount)) {
    document.getElementById("message").textContent =
      "金額が入力されていません。";
    return;
  }
  if (Number.isNaN(quantity)) {
    document.getElementById("message").textContent =
      "個数が入力されていません。";
    return;
  }
  document.getElementById("message").textContent = " ";

  const allElement = [name, amount, quantity];

  //   console.log("名称:" + name);
  //   console.log("金額:" + amount);
  //   console.log("個数:" + quantity);
  //   console.log("合計:" + amount * quantity);

  let newRow = table.insertRow();
  let newCell;
  for (let i = 0; i < 3; i++) {
    newCell = newRow.insertCell();
    newCell.append(allElement[i]);
    if (i < 1) {
      newCell.classList.add("left");
    } else {
      newCell.classList.add("right");
    }
    newCell.classList.add("border1");
  }

  //チェックボックスで合計に含むかどうかを今後判定させたい
  newCell = newRow.insertCell();
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  newCell.appendChild(checkbox);
  newCell.classList.add("border1");
  //

  sum += amount * quantity;

  document.getElementById("sumAmount").textContent = `合計金額:${sum}円`;
};
