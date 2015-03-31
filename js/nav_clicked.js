/**
 * This javascript shows and hides HUD elements when the user clicks on an item
 * in the navigation bar.
 *
 * created: 03/31/2015
 * author:  Brendan McGarry
 */
 
$(document).ready(function(){
    $("#nav-cat").click(toggleBackground);
    $("#nav-pinned").click(toggleBackground);
    $("#nav-settings").click(toggleBackground);
});

function toggleBackground(event){
    debugln("BEGIN toggleBackground");;
    var clickedID = event.target.id;
    debugln("  clickedID: [" + clickedID + "]");
    $(this).toggleClass("nav-selected");
    debugln("  toggled.");
    debugln("END toggleBackground");
}//end function