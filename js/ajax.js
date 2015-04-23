
var DEFAULT_USER_ID = "Anonymous";
var USER_ID = DEFAULT_USER_ID;

$(document).ready(function(){
    getAllPosts();
    getCategories();
    $("#login-form").submit(login);
    $("#ask-form").submit(postQuestion);
    $("#post-comment-form").submit(postAnswer);
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
                debugln("  " + key + "{" + val.question_id + ", " + val.question_text + ", " + val.question_category + "}");
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
            //alert("posts found");
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
        },//end function
        error: function(request, error){
            alert("ERROR:\n" +
                  "  Something went wrong when pulling questions\n" +
                  "    for category [" + category + "]\n" +
                  "  If you see a PoWoW engineer, show him/her this:\n" +
                  "    ERROR DETAILS: [" + error + "]"
            );
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

function login(event){
    debugln("BEGIN login");
    debugln("  getting user name...");
    var userName = $("#login-form-username").val();
    //alert("username: [" + username + "]");
    debugln("  username: [" + userName + "]");
    debugln("  getting password...");
    var pass = $("#login-form-password").val();
    //alert("password: [" + password + "]");
    debugln("  password: [" + pass + "]");
    debugln("  attempting to login...");
    var submitBtn = $(this).find("input[type=submit]:focus");
    //alert(submitBtn.attr("id"));
    //alert("username: [" + userName + "]\npassword: [" + pass + "]");
    if(submitBtn.attr("id") == "login-form-submit"){
        $.ajax({
            type: "GET",
            url: "http://default-environment-q4vew696kb.elasticbeanstalk.com/getUser.php",
            data: {username: userName, password: pass},
            dataType: 'JSON',
            success: function(json_data, textStatus, jqXHR){
                //alert("login sent! [" + textStatus + "]");
                debugln("  found [" + json_data.length + "]  object");
                debugln("  logging into account...");
                $.each(json_data, function(key, val){
                    debugln("  " + val.login);
                    if(val.login == "true"){
                        USER_ID = userName;
                        alert("SUCCESSFULLY LOGGED IN AS: [" + USER_ID + "]");
                        debugln("  clearing form data...");
                        $("#login-form-username").val("");
                        $("#login-form-password").val("");
                        debugln("  hiding login dropdown item...");
                        $("#dropdown-settings-login").hide();
                        debugln("  showing logout dropdown item...");
                        $("#dropdown-settings-logout").show();
                        debugln("  redirecting to home...");
                        $("#login").hide();
                        $("#posts").show(250);
                    }//end if
                    else{
                        USER_ID = DEFAULT_USER_ID;
                        alert("FAILED TO AUTHENTICATE AS: [" + userName + "]");
                        debugln("  clearing password...");
                        $("#login-form-password").val("");
                    }//end else
                });
            }//end function
        });
    }//end if
    else if(submitBtn.attr("id") == "login-form-register"){
        //alert("username: [" + userName + "] password: [" + pass + "]");
        $.ajax({
            type: "GET",
            url: "http://default-environment-q4vew696kb.elasticbeanstalk.com/pushUser.php",
            data: {username: userName, password: pass},
            dataType: 'JSON',
            success: function(json_data, textStatus, jqXHR){
                //alert("register sent! [" + textStatus + "]");
                debugln("  found [" + json_data.length + "]  object");
                debugln("  registering account...");
                $.each(json_data, function(key, val){
                    debugln("  " + val.joined);
                    if(val.joined == "true"){
                        alert("SUCCESSFULLY REGISTERED!\nWelcome to PoWoW, " + userName + ".");
                        debugln("  clearing form data...");
                        $("#login-form-username").val("");
                        $("#login-form-password").val("");
                        debugln("  hiding login dropdown item...");
                        $("#dropdown-settings-login").hide();
                        debugln("  showing logout dropdown item...");
                        $("#dropdown-settings-logout").show();
                        debugln("  logging in as registered user...");
                        USER_ID = userName;
                        debugln("  redirecting to home...");
                        $("#login").hide();
                        $("#posts").show(250);
                    }//end if
                    else{
                        alert("FAILED TO REGISTER PoWoW ACCOUNT FOR [" + userName + "]\nTry again with different user name.");
                    }//end else
                });
            }//end function
        });
    }//end else if
    debugln("END login");
    //?
    event.preventDefault();
}//end function

function postAnswer(event){
    debugln("BEGIN postAnswer");
    debugln("  getting user name...");
    var userName = USER_ID;
    debugln("  username: [" + userName + "]");
    debugln("  getting post id...");
    var postID = $("#post-id").val();
    debugln("  postID: [" + postID + "]");
    debugln("  getting comment...");
    var comment = $("#post-comment-form-val").val();
    debugln("  comment: [" + comment + "]");
    debugln("  attempting to post question...");
    //alert("username: [" + userName + "]\npostID: [" + postID + "]\ncomment: [" + comment + "]");
    $.ajax({
        type: "GET",
        url: "http://default-environment-q4vew696kb.elasticbeanstalk.com/pushResponse.php",
        data: {responderID: userName, origQuestion: postID, responseText: comment},
        dataType: 'JSON',
        success: function(json_data, textStatus, jqXHR){
            //alert("comment sent! [" + textStatus + "]");
            debugln("  found [" + json_data.length + "]  object");
            debugln("  adding new comment...");
            $.each(json_data, function(key, val){
                debugln("  " + val.posted);
                if(val.posted == "true"){
                    //alert("POSTED! :D");
                    debugln("  clearing comment form...");
                    $("#post-comment-form-val").val("");
                    debugln("  refreshing comment section...");
                    showComments(postID);
                }//end if
                else{
                    alert("FAILED TO POST COMMENT\n  Uknown error occurred; try again.");
                }//end else
            });
        }//end function
    });
    debugln("END postAnswer");
    //?
    event.preventDefault();
}//end function

function postQuestion(event){
    debugln("BEGIN postQuestion");
    debugln("  getting user name...");
    var userName = USER_ID;
    debugln("  username: [" + userName + "]");
    debugln("  getting category...");
    var cat = $("form input[type='radio']:checked").val();
    debugln("  category: [" + cat + "]");
    debugln("  getting question title...");
    var ques = $("#ask-form-question").val();
    debugln("  password: [" + ques + "]");
    debugln("  getting more info...");
    var quesMore = $("#ask-form-more").val();
    debugln("  more: [" + quesMore + "]");
    debugln("  attempting to post question...");
    alert("username: [" + userName + "]\ncategory: [" + cat + "]\nquestion: [" + ques + "]\nMore: [" + quesMore + "]");
    $.ajax({
        type: "GET",
        url: "http://default-environment-q4vew696kb.elasticbeanstalk.com/pushQuestion.php",
        data: {askerID: userName, qCategory: cat, qText: ques, qDescription: quesMore},
        dataType: 'JSON',
        success: function(json_data, textStatus, jqXHR){
            //alert("question sent! [" + textStatus + "]");
            debugln("  found [" + json_data.length + "]  object");
            debugln("  adding new post...");
            $.each(json_data, function(key, val){
                debugln("  " + val.posted);
                if(val.posted == "true"){
                    alert("POSTED! :D");
                    debugln("  clearing form data...");
                    $("#ask-form-question").val("");
                    $("#ask-form-more").val("");
                    $("#ask-form-cat > input").each(function(){
                        $(this).prop("checked", false);
                    });
                    //TODO(Brendan): redirect to their thread
                    //               if not DEFAULT_USER_ID, pin this thread too
                }//end if
                else{
                    alert("FAILED TO POST QUESTION\n  Uknown error occurred; try again.");
                }//end else
            });
        }//end function
    });
    debugln("END postQuestion");
    //?
    event.preventDefault();
}//end function

function showComments(id){
    debugln("BEGIN showComments");
    var categories;
    debugln("  clearing old comment section...");
    $("#post-comment-section").empty();
    debugln("  setting question id");
    $("#post-id").attr("value", id);
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