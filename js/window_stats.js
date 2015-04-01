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
    debugln("BEGIN updateWindowStats");
    var height = $(window).height();
    debugln("  height: [" + height + "]");
    var width = $(window).width();
    debugln("  width: [" + width + "]");
    var yscroll = $(window).scrollTop();
    debugln("  yscroll: [" + yscroll + "]");
    var stats = height + "x" + width + ":" + yscroll;
    $("#window-stats").html(stats);
    debugln("END updateWindowStats");
}//end function