"use strict";
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