/**
 * This javascript is called whenever the user clicks on a dropdown item
 *
 * created: 04/18/2015
 * author:  Brendan McGarry
 */
 
$(document).ready(function(){
    $(".dropdown-settings-item").each(
        function(){
            $(this).click(dropdownSettingsItem);
        }//end function
    );
    $(".dropdown-pinned-item").each(
        function(){
            $(this).click(dropdownPinnedItem);
        }//end function
    );
});

function dropdownPinnedItem(event){
    debugln("BEGIN dropdownPinnedItem");
    var clickedId = event.target.id;
    debugln("  clicked: [" + clickedId + "]");
    debugln("  toggling HUD button...");
    $("#button-cancel").hide();
    $("#button-ask").show();
    debugln("  hiding pinned dropdown...");
    $("#dropdown-pinned").hide();
    debugln("  removing selected class...");
    $("#nav-pinned").removeClass("nav-selected");
    //TODO(ALL): use AJAX to pull pin data
    debugln("  hiding content areas...");
    $("#posts").hide();
    $("#login").hide();
    $("#profile").hide();
    $("#ask").hide();
    $("#post").show(250);
    debugln("END dropdownPinnedItem");
}//end function

function dropdownSettingsItem(event){
    debugln("BEGIN dropdownSettingsItem");
    var clickedId = event.target.id;
    debugln("  clicked: [" + clickedId + "]");
    debugln("  toggling HUD button");
    $("#button-cancel").hide();
    $("#button-ask").show();
    debugln("  hiding settings dropdown..");
    $("#dropdown-settings").hide();
    debugln("  removing selected class...");
    $("#nav-settings").removeClass("nav-selected");
    if(clickedId == "dropdown-settings-login"){
        debugln("  hiding content divs...");
        $("#ask").hide();
        $("#posts").hide();
        $("#post").hide();
        $("#profile").hide();
        debugln("  showing login form...");
        $("#login").show(250);
    }//end if
    else if(clickedId == "dropdown-settings-profile"){
        debugln("  hiding ask and posts divs...");
        $("#ask").hide();
        $("#posts").hide();
        $("#post").hide();
        $("#login").hide();
        debugln("  showing profile form...");
        $("#profile").show(250);
    }//end if
    debugln("END dropdownSettingsItem");
}//end method