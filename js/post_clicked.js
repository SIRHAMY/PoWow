/**
 * This javascript is triggered when a user clicks on a post to get more info
 *
 * created: 04/18/2015
 * author:  Brendan McGarry
 */

function postClicked(event){
    debugln("BEGIN postClicked");
    var clickedId = event.target.id;
    debugln("  clickedId: [" + clickedId + "]");
    debugln("  hiding content areas...");
    $("#posts").hide();
    $("#login").hide();
    $("#profile").hide();
    $("#ask").hide();
    $("#post").show(250);
    //TODO(ALL): use AJAX to load this data and comment section
    debugln("END postClicked");
}//end function