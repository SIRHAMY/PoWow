/**
 * This JavaScript makes the HUD button in the bottom right corner of the page
 * follow the user down the page
 *
 * created: 04/01/2015
 * author:  Brendan McGarry
 */

$(document).ready(function(){
    stickyButton();
    $(window).scroll(stickyButton);
    $(window).resize(stickyButton);
});

function stickyButton(){
    //bottom/right offset for button
    var offset = 10;
    //size of the button in pixels
    var buttonLength = 50;
    debugln("BEGIN stickyButton");
    var curYPos = $(window).scrollTop();
    debugln("  curYPos: [" + curYPos + "]");
    var height = $(window).height();
    debugln("  height: [" + height + "]");
    var totalHeight = height + curYPos;
    debugln("  totalHeight: [" + totalHeight + "]");
    var width = $(window).width();
    debugln("  width: [" + width + "]");
    var footerPos = $("#footer-outer").offset();
    debugln("  footerPos: [" + footerPos.left + ", " + footerPos.top + "]");
    //don't let the button come into the footer.  if we see that the bottom of
    //  the button will cross into the footer, we don't update the position.
    var x;
    var y;
    y = (totalHeight - offset) - buttonLength;
    x = (width - offset) - buttonLength;
    debugln("  position: [" + x + ", " + y + "]");
    //set the location
    $("#button").css("top", y + "px");
    $("#button").css("left", x + "px");
    debugln("END stickyButton");
}//end function