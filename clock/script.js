"use stript";

function c() {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const minut = time.getMinutes();
  const sec = time.getSeconds();

  
  const monthStr = String(month).padStart(2, "0");
  const dayStr = String(day).padStart(2, "0");
  const hoursStr = String(hour).padStart(2, "0");
  const minutesStr = String(minut).padStart(2, "0");
  const secondsStr = String(sec).padStart(2, "0");

  const d = document.getElementById("q");
  let str = `現在時刻:${year}/${monthStr}/${dayStr} ${hoursStr}:${minutesStr}:${secondsStr}`;

  d.textContent = str;
}

setInterval(c, 1000);
c();


function countdown(due) {
			const now = new Date();
			const rest = due.getTime() - now.getTime();
			if (rest <= 0) return [0, 0, 0, 0];
			const sec = Math.floor(rest / 1000) % 60;
			const min = Math.floor(rest / 1000 / 60) % 60;
			const hours = Math.floor(rest / 1000 / 60 / 60) % 24;
			const days = Math.floor(rest / 1000 / 60 / 60 / 24);
			return [days, hours, min, sec];
		}

		let goal = new Date();

		document.getElementById("form").onsubmit = function (event) {
			event.preventDefault();
			
			const h = parseInt(document.getElementById('hours').value, 10);
			const m = parseInt(document.getElementById('minutes').value, 10);

			const now = new Date();
			goal = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);

			if (goal.getTime() <= now.getTime()) {
				goal.setDate(goal.getDate() + 1);
			}

			document.getElementById("setTime").textContent =`${goal.getMonth() + 1}月${goal.getDate()}日 ${h}時${m}分まで`;
		};

		function recalc() {
			const counter = countdown(goal);
			const time = `あと${counter[1]}時間${counter[2]}分${counter[3]}秒`;
			document.getElementById('timer').textContent = time;

			if (counter[1] === 0 && counter[2] === 0 && counter[3] === 0){
				document.getElementById('setTime').textContent = "目標時刻になりました";
				document.getElementById('timer').textContent = "";
			}
			refresh();
		}

		function refresh() {
			setTimeout(recalc, 1000);
		}

		recalc();
