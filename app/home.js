"use strict";

console.log("entrypoint");
const app = require("./app");

// this runs the code

function HomeIndex() {
    const heightFromTop = 300;
    this.initialiseScrollToTopButton = function () {
        $(window).scroll(function () {
            var verticalHeight = $(this).scrollToTop();
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
    appp.HomeIndex = new HomeIndex();
    appp.HomeIndex.initialiseScrollToTopButton();
});


// Get the button
const scrollToTop = document.getElementById("scrollToTop");

// When the user scrolls down 100px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
scrollToTop.addEventListener("click", function() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
});
