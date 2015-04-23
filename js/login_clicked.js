/**
 * This javascript is called whenever the user interacts with the login forrm
 *
 * created: 04/18/2015
 * author:  Brendan McGarry
 */
 
$(document).ready(function(){
    $("#login-close").click(closeLogin);
});

function closeLogin(event){
    debugln("BEGIN closeLogin");
    var clickedId = event.target.id;
    debugln("  clicked: [" + clickedId + "]");
    debugln("  toggling HUD button...");
    $("#button-cancel").hide();
    $("#button-ask").show();
    debugln("  hiding login form..");
    hideContent();
    debugln("  showing posts...");
    $("#posts").show(250);
    debugln("END closeLogin");
}//end method