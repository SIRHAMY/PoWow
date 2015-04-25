/**
 * This javascript is triggered when a user clicks on a post to get more info
 *
 * created: 04/18/2015
 * author:  Brendan McGarry
 */

function postClicked(event){
    debugln("BEGIN postClicked");
    var clickedId = event.target.id;
    var clickedClass = event.target.className;
    if(clickedClass == "post-metadata"){
        clickedId = event.target.parentElement.id;
    }//end if
    //alert("id: [" + clickedId + "]\nclass: [" + clickedClass + "]\nid==\"\": [" + (clickedId == "") + "]");
    if(clickedId != ""){
        debugln("  clickedId: [" + clickedId + "]");
        debugln("  hiding content areas...");
        hideContent();
        showPost(clickedId);
        showComments(clickedId);
        $("#post").show(250);
    }//end if
    debugln("END postClicked");
}//end function   