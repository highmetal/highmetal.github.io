"use stript";

function c() {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const minut = time.getMinutes();
  const sec = time.getSeconds();

  const d = document.getElementById("q");
  let str = `${year}/${month}/${day} ${hour}:${minut}:${sec}`;

  d.textContent = str;
}

setInterval(c, 1000);
c();
