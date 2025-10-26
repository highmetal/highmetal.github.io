"use stript";

function c() {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const minut = time.getMinutes();
  const sec = time.getSeconds();

  const hoursStr = String(hour).padStart(2, "0");
  const minutesStr = String(minut).padStart(2, "0");
  const secondsStr = String(sec).padStart(2, "0");

  const d = document.getElementById("q");
  let str = `${year}/${month}/${day} ${hoursStr}:${minutesStr}:${secondsStr}`;

  d.textContent = str;
}

setInterval(c, 1000);
c();
