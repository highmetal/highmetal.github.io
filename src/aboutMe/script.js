"use strict";

 //body color changer 
    const body = document.getElementById("body");

    function rectTopCheck(element){
        return element.getBoundingClientRect().top;
    }
    
    window.addEventListener("scroll", function () {
        const sectionAll = document.querySelectorAll("section");
        const colorList = ["#ffffff", "#f1f5f1", "#e9f0e9", "#e2ede2", "#c6dac3", "#94af8d", "#6b8f71", "#4a6d50"]

        sectionAll.forEach((section, i) => {
            if(rectTopCheck(section) < window.innerHeight){
                body.style.backgroundColor = colorList[i];
            }
        });
    })

    //copy right auto appdate
    document.getElementById("year").textContent = new Date().getFullYear();