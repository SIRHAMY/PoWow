/**
 * This JavaScript is called whenever the user on a category to browse
 *
 * created: 04/18/2015
 * author:  Brendan McGarry
 */

function categoryClicked(event){
    debugln("BEGIN categoryClicked");
    var clickedId = event.target.id;
    debugln("  clicked: [" + clickedId + "]");
    debugln("  hiding nav stuff...");
    $("#dropdown-cat").hide();
    $("#nav-cat").removeClass("nav-selected");
    debugln("  hiding other page forms...");
    $("#ask").hide();
    $("#login").hide();
    $("#profile").hide();
    $("#post").hide();
    debugln("  fixing HUD button...");
    $("#button-cancel").hide();
    $("#button-ask").show();
    debugln("  updating nav category display");
    $("#nav-cur-cat").html(clickedId);
    debugln("  generating posts...");
    getPosts(clickedId);
    debugln("  showing posts");
    $("#posts").show(250);
    debugln("END categoryClicked");
}//end function 