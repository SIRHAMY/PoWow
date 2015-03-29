/**
 * This javascript makes the navigation bar on the app sticky.  Once the user
 * has scrolled down past the header, so the navigation bar is at the top of
 * the page, the navigation remains at the top of the page and follows the user
 * down.  Once the user has scrolled back towards the top, the navigation bar
 * goes back to its original place.
 *
 * created: 03/28/2015
 * author:  Brendan McGarry
 */

$(document).ready(function(){
    stickyNav();
});

$(window).scroll(function(){
    stickyNav();
});

function stickyNav(){
    var headerHeight = $("#header-outer").height();
    var curYPos = $(window).scrollTop();
    if(curYPos > headerHeight){
        console.log("adding sticky class...");
        $("#navigation-outer").addClass("sticky");
    }//end if
    else{
        $("#navigation-outer").removeClass("sticky");
    }//end else
}//end function