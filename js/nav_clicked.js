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
    debugln("  unclicking all menu items...");
    $("#nav-cat").removeClass("nav-selected");
    $("#nav-settings").removeClass("nav-selected");
    $("#nav-pinned").removeClass("nav-selected");
    debugln("  hiding all dropdowns...");
    $("#dropdown-cat").hide();
    $("#dropdown-pinned").hide();
    $("#dropdown-settings").hide();
    debugln("  done.");
    var clickedID = event.target.id;
    debugln("  clickedID: [" + clickedID + "]");
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