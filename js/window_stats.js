/**
 * This javascript enables us to see the current client window size, 
 * horizontal scrolling, and vertical scrolling.
 *
 * created: 03/28/2015
 * author:  Brendan McGarry
 */
 
$(document).ready(function(){
    updateWindowStats();    
    $(window).scroll(updateWindowStats);
    $(window).resize(updateWindowStats);    
});



function updateWindowStats(){
    var height = $(window).height();
    var width = $(window).width();
    var yscroll = $(window).scrollTop();
    var stats = height + "x" + width + ":" + yscroll;
    $("#window-stats").html(stats);
}//end function