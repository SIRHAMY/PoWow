/**
 * This JavaScript is called whenever the user clicks the HUD button
 *
 * created: 04/18/2015
 * author:  Brendan McGarry
 */

$(document).ready(function(){
    $("#button-ask").click(AskClicked);
    $("#button-cancel").click(CancelClicked);
});

function AskClicked(event){
    debugln("BEGIN AskClicked");
    debugln("  hiding content divs..");
    $("#posts").hide();
    $("#login").hide();
    $("#profile").hide();
    $("#post").hide();
    debugln("  hiding dropdowns...");
    $("#dropdown-settings").hide();
    $("#dropdown-pinned").hide();
    $("#dropdown-cat").hide();
    debugln("  unselecting nav items...");
    $("#nav-cat").removeClass("nav-selected");
    $("#nav-pinned").removeClass("nav-selected");
    $("#nav-settings").removeClass("nav-selected");
    debugln("  toggling buttons...");
    $("#button-ask").hide();
    $("#button-cancel").show();
    $("#ask").show(250);
    debugln("END AskClicked");
}//end function

function CancelClicked(event){
    debugln("BEGIN CancelClicked");
    debugln("  hiding content divs...");
    $("#ask").hide();
    debugln("  toggling buttons...");
    $("#button-cancel").hide();
    $("#button-ask").show();
    $("#posts").show(250);
    debugln("END CancelClicked");
}//end function