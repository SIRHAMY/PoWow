/**
 * This javascript makes the dropdowns for the navigation bar sticky.  Once the
 * user has scrolled down past the header, the dropdowns triggered from
 * interacting with the navigation bar become sticky and follow the user down
 * the page.
 *
 * created: 04/01/2015
 * author:  Brendan McGarry
 */

$(document).ready(function(){
    stickyDropdown();    
    $(window).scroll(stickyDropdown);
});

function stickyDropdown(){
    debugln("BEGIN stickyDropdown");
    var headerHeight = $("#header-outer").height();
    debugln("  headerHeight: [" + headerHeight + "]");
    var curYPos = $(window).scrollTop();
    debugln("  curYPos: [" + curYPos + "]");
    if(curYPos > headerHeight){
        debugln("  sticky");
        $("#dropdown-cat").addClass("sticky-dropdown-left");
        $("#dropdown-pinned").removeClass("dropdown-block-right");
        $("#dropdown-pinned").addClass("sticky-dropdown-right");
        $("#dropdown-settings").removeClass("dropdown-block-right");
        $("#dropdown-settings").addClass("sticky-dropdown-right");
    }//end if
    else{
        debugln("  nonstick");
        $("#dropdown-cat").removeClass("sticky-dropdown-left");
        $("#dropdown-pinned").removeClass("sticky-dropdown-right");
        $("#dropdown-pinned").addClass("dropdown-block-right");
        $("#dropdown-settings").removeClass("sticky-dropdown-right");
        $("#dropdown-settings").addClass("dropdown-block-right");
    }//end else
    debugln("END stickyDropdown");
}//end function