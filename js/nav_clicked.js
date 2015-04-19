/**
 * This javascript shows and hides HUD elements when the user clicks on an item
 * in the navigation bar.
 *
 * created: 03/31/2015
 * author:  Brendan McGarry
 */
 
$(document).ready(function(){
    /*$("#nav-cat").click(toggleBackground);
    $("#nav-pinned").click(toggleBackground);
    $("#nav-settings").click(toggleBackground);*/
    $("#nav-cat").click(handleClick);
    $("#nav-pinned").click(handleClick);
    $("#nav-settings").click(handleClick);
});

function handleClick(event){
    debugln("BEGIN handleClick");
    var clickedID = event.target.id;
    debugln("  clickedID: [" + clickedID + "]");
    debugln("  unclicking all menu items...");
    if(clickedID != "nav-cat"){
        $("#nav-cat").removeClass("nav-selected");
        $("#dropdown-cat").hide();
    }//end if
    if(clickedID != "nav-settings"){
        $("#nav-settings").removeClass("nav-selected");
        $("#dropdown-settings").hide();
    }//end if
    if(clickedID != "nav-pinned"){
        $("#nav-pinned").removeClass("nav-selected");
        $("#dropdown-pinned").hide();
    }//end if    
    debugln("  toggling background...");
    toggleBackground(clickedID);
    debugln("  toggling dropdown...");
    toggleDropdown(clickedID);
    debugln("END handleClick");
}//end function

function toggleBackground(id){
    debugln("  BEGIN toggleBackground");;
    var clickedID = event.target.id;
    debugln("    clickedID: [" + clickedID + "]");
    $("#" + id).toggleClass("nav-selected");
    debugln("    toggled");
    debugln("  END toggleBackground");
}//end function

function toggleDropdown(id){
    debugln("  BEGIN toggleDropdown");
    if("nav-cat" === id){
        debugln("    category");
        $("#dropdown-cat").toggle(250);
    }//end if
    else if("nav-pinned" === id){
        debugln("    pinned");
        $("#dropdown-pinned").toggle(250);
    }//end else if
    else if("nav-settings" === id){
        debugln("    settings");
        $("#dropdown-settings").toggle(250);
    }//end else if
    debugln("  END toggleDropdown");
}//end function