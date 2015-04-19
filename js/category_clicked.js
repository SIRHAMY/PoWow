/**
 * This JavaScript is called whenever the user on a category to browse
 *
 * created: 04/18/2015
 * author:  Brendan McGarry
 */

$(document).ready(function(){
    $(".dropdown-cat-item").each(
        function(){
            $(this).click(categoryClicked);
        }//end function
    );
});

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
    //TODO(ALL): do AJAX call to update posts based on category pulled
    //           update the current category in nav bar (#nav-cur-cat)
    debugln("  showing posts");
    $("#posts").show(250);
    debugln("END categoryClicked");
}//end function 