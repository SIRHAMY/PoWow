/**
 * This javascript handles debug output
 *
 * created: 03/31/2015
 * author:  Brendan McGarry
 */

//whether or not to print debug messages 
var DEBUG_MODE = true;
//whether or not to use alerts or console.log for displaying debug output
var USE_ALERTS = false;
 
 function debugln(message){
    if(DEBUG_MODE){
        if(USE_ALERTS){
            alert(message);
        }//end if
        else{
            console.log(message);
        }//end else
    }//end if
 }//end function