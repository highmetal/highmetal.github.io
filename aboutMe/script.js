"use strict";

 //body color changer 
    const body = document.getElementById("body");

    function rectTopCheck(element){
        return element.getBoundingClientRect().top;
    }
    
    window.addEventListener("scroll", function () {
        const copyRight = this.document.getElementById("copyRight");
        const want = document.getElementById("want");
        const bad = document.getElementById("bad");
        const likeSongs = document.getElementById("likeSongs");
        const like = document.getElementById("like");
        const overView = document.getElementById("overView");
        const index = this.document.getElementById("index");
        
        let color = "#ffffff";
        
        if(rectTopCheck(index) > 0){
            color = "#f1f5f1"
        }else if(rectTopCheck(overView) > 0){
            color = "#e9f0e9"
        }else if(rectTopCheck(like) > 0){
            color = "#e2ede2"
        }else if(rectTopCheck(likeSongs) > 0){
            color = "#c6dac3"
        }else if(rectTopCheck(bad) > 0){
            color = "#94af8d"
        }else if (rectTopCheck(want) > 0) {
            color = "#6b8f71";
        }else if (rectTopCheck(copyRight) > 0) {
            color = "#4a6d50";
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

    appdateTimes.textContent = `最終更新：${y}/${m}/${d} ${h}:${min}`;
