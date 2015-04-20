
var USER_ID;

$(document).ready(function(){
    getAllPosts();
    getCategories();
});

function getAllPosts(){
    debugln("BEGIN getAllPosts");
    debugln("  getting AJAX...");
    $.ajax({
        type: "GET",
        url: "http://default-environment-q4vew696kb.elasticbeanstalk.com/getAllQuestions.php",
        dataType: 'JSON',
        success: function(json_data){
            debugln("  found [" + json_data.length + "] posts!");
            debugln("  clearing posts...");
            $("#posts").empty();
            debugln("  adding posts...");
            $.each(json_data, function(key, val){
                $("#posts").append(
                    "<div id=\"" + val.question_id + "\"class=\"post\" onclick=\"postClicked(event)\">" +
                    "<div class=\"post-pinned\"></div>" + 
                    val.question_text + 
                    "<div class=\"post-metadata\">" +
                    "asked by: " + val.asker_id + " in " + val.question_category + " 3 answers 0 pins" +
                    "</div>"
                );
            });
        }//end function
    });
    debugln("END getAllPosts");
}//end function

function getPosts(category){
    debugln("BEGIN getPosts");
    debugln("  getting posts with category [" + category + "]...");
    $.ajax({
        type: "GET",
        url: "http://default-environment-q4vew696kb.elasticbeanstalk.com/getCatQuestions.php",
        data: {qCategory: category},
        dataType: 'JSON',
        success: function(json_data){
            debugln("  found [" + json_data.length + "] posts!");
            debugln("  clearing posts...");
            $("#posts").empty();
            debugln("  adding posts...");
            $.each(json_data, function(key, val){
                $("#posts").append(
                    "<div id=\"" + val.question_id + "\"class=\"post\" onclick=\"postClicked(event)\">" +
                    "<div class=\"post-pinned\"></div>" + 
                    val.question_text + 
                    "<div class=\"post-metadata\">" +
                    "asked by: " + val.asker_id + " in " + val.question_category + " 3 answers 0 pins" +
                    "</div>"
                );
            });
        }//end function
    });
    debugln("END getPosts");
}//end function

function getCategories(){
    debugln("BEGIN getCategories");
    var categories;
    debugln("  getting AJAX...");
    $.ajax({
        type: "GET",
        url: "http://default-environment-q4vew696kb.elasticbeanstalk.com/getCategories.php",
        dataType: 'JSON',
        success: function(json_data){
            debugln("  found [" + json_data.length + "] categories!");
            categories = new Array(json_data.length);            
            debugln("  adding categories...");
            $.each(json_data, function(key, val){
                debugln("  " + val.category_id + " = " + val.category_name);
                $("#dropdown-cat").append(
                    "<div id=\"" + val.category_name + "\" class=\"dropdown-cat-item\" onclick=\"categoryClicked(event)\">" +
                    val.category_id + 
                    "</div>"
                );
                $("#ask-form-cat").append(
                    "<input type=\"radio\" name=\"category\" value=\"" + val.category_name + "\">" +
                    val.category_name +
                    "<br />"
                );
            });
            debugln("  adding clear div...");
            $("#dropdown-cat").append(
                "<div class=\"clear\"></div>"
            );
        }//end function
    });
    debugln("END getCategories");
}//end function