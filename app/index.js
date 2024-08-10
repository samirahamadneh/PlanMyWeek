"use strict";

console.log("entrypoint");
const app = require("./PlanMyWeek/app/app");

// this runs the code

function HomeIndex() {
    const heightFromTop = 300;
    this.initialiseScrollToTopButton = function () {
        $(window).scroll(function () {
            var verticalHeight = $(this).scrollTop();
            if (verticalHeight > heightFromTop) {
                $("#scrollToTop").fadeIn();
            } else {
                $("#scrollToTop").fadeOut();
            }
        });
        $("#scrollToTop").click(function() {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });
    }
}

$(document).ready(function () {
    app.homeIndex = new HomeIndex();
    app.homeIndex.initialiseScrollToTopButton();
});