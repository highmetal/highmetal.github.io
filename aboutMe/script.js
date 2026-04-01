"use strict";

 //body color changer 
    const body = document.getElementById("body");
    window.addEventListener("scroll", function () {
        let color = "white";
        if (window.scrollY > 10) {
            color = "#f7f9f7";
        }
        if (window.scrollY > 200) {
            color = "#dbe7d8";
        }
        if (window.scrollY > 550) {
            color = "#a9c5a0";
        }
        if (window.scrollY > 1600) {
            color = "#6b8f71";
        }
        body.style.backgroundColor = color;
    })

    //copy right auto appdate
    document.getElementById("year").textContent = new Date().getFullYear();

    //auto appdate time
    const appdateTimes = document.getElementById("update");

    const modified = new Date(document.lastModified);

    const y = modified.getFullYear();
    const m = String(modified.getMonth() + 1).padStart(2, '0');
    const d = String(modified.getDate()).padStart(2, '0');
    const h = String(modified.getHours()).padStart(2, '0');
    const min = String(modified.getMinutes()).padStart(2, '0');

    appdateTimes.textContent = `更新：${y}/${m}/${d} ${h}:${min}`;