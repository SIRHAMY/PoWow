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
    hideContent();
    showPost(clickedId);
    showComments(clickedId);
    $("#post").show(250);
    debugln("END postClicked");
}//end function