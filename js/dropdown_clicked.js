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
    showPost(clickedId);
    showComments(clickedId);
    debugln("  hiding content areas...");
    hideContent();
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
    debugln("  hiding content divs...");
    hideContent();
    if(clickedId == "dropdown-settings-login"){
        debugln("  showing login form...");
        $("#login").show(250);
    }//end if
    else if(clickedId == "dropdown-settings-profile"){
        debugln("  updating profile page...");
        $("#profile-title").text(USER_ID + "'s Profile:");
        //TODO(Brendan): add more profile stats and such
        debugln("  showing profile form...");
        $("#profile").show(250);
    }//end if
    else if(clickedId == "dropdown-settings-logout"){
        USER_ID = DEFAULT_USER_ID;
        displaySuccess(
            "You have logged out of PoWoW."
        );
        debugln("  hiding logout dropdown item...");
        $("#dropdown-settings-logout").hide();
        debugln("  hiding my profile dropdown item...");
        $("#dropdown-settings-profile").hide();
        debugln("  showing login dropdown item...");
        $("#dropdown-settings-login").show();
        debugln("  reloading all posts");
        getAllPosts();
        debugln("  showing success message");
        $("#success").show();
    }//end else if
    debugln("END dropdownSettingsItem");
}//end method