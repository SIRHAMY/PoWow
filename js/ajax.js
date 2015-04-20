
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
                    "asked by: " + val.asker_id + " in " + val.question_category + " [3 answers 0 pins]" +
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
                    "asked by: " + val.asker_id + " in " + val.question_category + " [3 answers 0 pins]" +
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

function showComments(id){
    debugln("BEGIN showComments");
    var categories;
    debugln("  clearing old post...");
    $("#post-comment-section").empty();
    debugln("  clearing old comment...");
    $("#post-comment").empty();
    debugln("  adding answer form...");
    $("#post-comment").append(
        "<form id=\"post-comment-form\">" +
        "<span style=\"font-size: 10px;\">Your Answer:</span>" +
        "<textarea id=\"post-comment-form-val\"></textarea>" +
        "<input id=\"post-comment-form-submit\" type=\"submit\" value=\"Answer\" />" +
        "</form>"
    );
    debugln("  getting AJAX for post ID [" + id + "]...");
    $.ajax({
        type: "GET",
        url: "http://default-environment-q4vew696kb.elasticbeanstalk.com/getResponses.php",
        data: {qID: id},
        dataType: 'JSON',
        success: function(json_data){
            debugln("  found [" + json_data.length + "] questions");
            debugln("  adding new post...");
            $.each(json_data, function(key, val){
                debugln("  [" + key + "]: [" + val.question_text + "]");
                $("#post-comment-section").append(
                    "<div class=\"comment\">" +
                    "<div class=\"comment-upvote\"></div>" +
                    "<div class=\"comment-downvote\"></div>" +
                    val.response_text +
                    "<div class=\"comment-metadata\">" +
                    "answered by: " + val.responder_id + " [5 upvotes 1 downvote]" + 
                    "</div>" +
                    "</div>"
                );
            });
        }//end function
    });
    debugln("END showComments");
}//end function

function showPost(id){
    debugln("BEGIN showPost");
    var categories;
    debugln("  clearing old post...");
    $("#post-question").empty();
    debugln("  getting AJAX for post ID [" + id + "]...");
    $.ajax({
        type: "GET",
        url: "http://default-environment-q4vew696kb.elasticbeanstalk.com/getQuestion.php",
        data: {qID: id},
        dataType: 'JSON',
        success: function(json_data){
            debugln("  found [" + json_data.length + "] questions");
            debugln("  adding new post...");
            $.each(json_data, function(key, val){
                debugln("  [" + key + "]: [" + val.question_text + "]");
                $("#post-question").append(
                    "<div class=\"post-pinned\"></div>" + 
                    "<div id=\"post-question-title\">" +
                    val.question_text +
                    "</div>" +
                    "<div id=\"post-question-metadata\" class=\"post-metadata\">" +
                        "asked by: " + val.asker_id + " in " + val.question_category + " [256 answers 4 pins]"+
                    "</div>" +
                    "<hr />" +
                    "<div id=\"post-question-more\">" +
                        val.question_description +
                    "</div>"
                );
            });
        }//end function
    });
    debugln("END showPost");
}//end function