
var DEFAULT_USER_ID = "Anonymous";
var USER_ID = DEFAULT_USER_ID;
var MAX_COMMENT_LENGTH = 1000;
var MAX_QUESTION_TITLE_LENGTH = 70;
var MAX_QUESTION_DETAILS_LENGTH = 1000;

$(document).ready(function(){
    getAllPosts();
    getCategories();
    $("#login-form").submit(login);
    $("#ask-form").submit(postQuestion);
    $("#post-comment-form").submit(postAnswer);
});

function displayAJAXError(message, jqXHR, textStatus, errorThrown){
    debugln("BEGIN displayAJAXError");
    debugln("  hiding success div...");
    $("#success").hide();
    debugln("  emptying previous error message...");
    $("#error-message").empty();
    $("#error-details").empty();
    debugln("  generating content...");
    $("#error-message").append(
        message + "<br /><br />" +
        "If you see a PoWoW engineer, show him/her this:<br /><br />"
     );
    $("#error-details").append(
        "<ul>" +
            "<li>" +
                "Response Text:<br />" + 
                "&nbsp;&nbsp;" + jqXHR.responseText +
            "</li>" +
            /*
            "<li>" +
                "Response XML:<br />" +
                "&nbsp;&nbsp;" + jqXHR.responseXML +
            "</li>" +
            "<li>" +
                "Response Header:<br />" +
                "&nbsp;&nbsp;" + jqXHR.getResponseHeader +
            "</li>" +
            */
            "<li>" +
                "Text Status:<br />" +
                "&nbsp;&nbsp;" + textStatus +
            "</li>" +
            "<li>" +
                "Error Thrown:<br />" +
                "&nbsp;&nbsp;" + errorThrown +
            "</li>" +
        "</ul>"
    );
    debugln("  showing error message...");
    $("#error").show(250);
    debugln("END displayAJAXError");
}//end function

function displayFormError(error, errorDetails){
    debugln("BEGIN displayFormError");
    debugln("  hiding success div...");
    $("#success").hide();
    debugln("  emptying previous error message...");
    $("#error-message").empty();
    $("#error-details").empty();
    debugln("  generating content...");
    $("#error-message").append(
        error + "<br /><br />"
     );
    $("#error-details").append(
        errorDetails
    );
    debugln("  showing error message...");
    $("#error").show(250);
    debugln("END displayFormError");
}//end function

function displaySuccess(message){
    debugln("BEGIN displaySuccess");
    debugln("hiding error div...");
    $("#error").hide();
    debugln("  clearing success message...");
    $("#success-message").empty();
    debugln("  generating content...");
    $("#success-message").append(
        message
     );
    debugln("  showing success message...");
    $("#success").show(250);
    debugln("END displaySuccess");
}//end function

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
            if((json_data.length == 1) && (json_data[0].returned == "false")){
                $("#posts").append(
                    "<span style=\"font-size: 20px; color: #3F3F41\">" +
                    "There seems to be no posts..." +
                    "</span>"
                );
            }//end if
            else{
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
            }//end else
        },//end function
        error: function(jqXHR, textStatus, errorThrown){
            displayAJAXError(
                  "Something went wrong when pulling questions for homepage",
                  jqXHR, textStatus, errorThrown                  
            );
        }//end function
    });
    debugln("END getAllPosts");
}//end function

function getPosts(category){
    debugln("BEGIN getPosts");
    debugln("  getting posts with category [" + category + "]...");
    debugln("  clearing posts...");
    $("#posts").empty();
    $.ajax({
        type: "GET",
        url: "http://default-environment-q4vew696kb.elasticbeanstalk.com/getCatQuestions.php",
        data: {qCategory: category},
        dataType: 'JSON',
        success: function(json_data){
            //alert(json_data.length + "\n" + json_data[0].returned);
            debugln("  found [" + json_data.length + "] posts!");
            debugln("  adding posts...");
            if((json_data.length == 1) && (json_data[0].returned == "false")){
                $("#posts").append(
                    "<span style=\"font-size: 20px; color: #3F3F41\">" +
                    "There seems to be no posts for this category..." +
                    "</span>"
                );
            }//end if
            else{
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
            }//end else
        },//end function
        error: function(jqXHR, textStatus, errorThrown){
            displayAJAXError(
                  "Something went wrong when pulling questions" +
                  " for category [" + category + "]",
                  jqXHR, textStatus, errorThrown                  
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
            if((json_data.length == 1) && (json_data[0].returned == "false")){
                $("#dropdown-cat").append(
                    "<span style=\"font-size: 20px; color: #FFFFFF\">" +
                    "Could not find any categories..." +
                    "</span>"
                );
                $("#ask-form-cat").append(
                    "<span style=\"font-size: 20px; color: #3F3F41\">" +
                    "Could not find any categories..." +
                    "</span>"
                );
            }//end if
            else{
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
            }//end else
            debugln("  adding clear div...");
            $("#dropdown-cat").append(
                "<div class=\"clear\"></div>"
            );
        },//end function
        error: function(jqXHR, textStatus, errorThrown){
            displayAJAXError(
                  "Something went wrong when retrieving categories",
                  jqXHR, textStatus, errorThrown                  
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
    var errorDetails = "";
    var regexUserName = new RegExp("^[A-Za-z0-9_]{6,20}$");
    var validatedUser = userName.match(regexUserName);
    var regexUserPass = new RegExp("^[A-Za-z0-9!@#\$%\^&\*\(\)]{6,30}$");
    var validatedPass = pass.match(regexUserPass);
    /*alert("username: [" + userName + "]\npassword: [" + pass + "]");
    if(validatedUser == null || validatedPass == null){
        alert("regex validation failed!");
    }//end if*/
    if(submitBtn.attr("id") == "login-form-submit"){
        if(validatedUser == null || validatedPass == null){
            displayFormError(
                "Failed to authenticate", 
                "Please check the username and password combination and try again"
            );
        }//end if
        else{
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
                            //alert("SUCCESSFULLY LOGGED IN AS: [" + USER_ID + "]");
                            displaySuccess("You are now logged in. Welcome back, " + USER_ID + ".");
                            debugln("  clearing form data...");
                            $("#login-form-username").val("");
                            $("#login-form-password").val("");
                            debugln("  hiding login dropdown item...");
                            $("#dropdown-settings-login").hide();
                            debugln("  showing logout dropdown item...");
                            $("#dropdown-settings-logout").show();
                            debugln("  showing my profile dropdown item...");
                            $("#dropdown-settings-profile").show();
                            debugln("  redirecting to home...");
                            $("#login").hide();
                            $("#posts").show(250);
                        }//end if
                        else{
                            USER_ID = DEFAULT_USER_ID;
                            //alert("FAILED TO AUTHENTICATE AS: [" + userName + "]");
                            displayFormError(
                                "Failed to authenticate", 
                                "Please check the username and password combination and try again"
                            );
                            debugln("  clearing password...");
                            $("#login-form-password").val("");
                        }//end else
                    });
                },//end function
                error: function(jqXHR, textStatus, errorThrown){
                    displayAJAXError(
                          "Something went wrong when attempting to log in",
                          jqXHR, textStatus, errorThrown                  
                    );
                }//end function
            });
        }//end else
    }//end if
    else if(submitBtn.attr("id") == "login-form-register"){
        //alert("username: [" + userName + "] password: [" + pass + "]");
        if(validatedUser == null || validatedPass == null){
            displayFormError(
                "Failed to register", 
                "Please check the username and password combination and try again:<br /><br/>" +
                "Usernames can only contain an underscore and alphanumeric characters. " +
                "Usernames must be 6 to 20 characters long<br /><br/>" +
                "Passwords can only contain alphanumeric and special characters." +
                "Special characters are defined as:<br /><br />" +
                "!@#$%^&*()<br /><br />" +
                "Passwords must be between 6 and 30 characters"
            );
        }//end if
        else{
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
                            //alert("SUCCESSFULLY REGISTERED!\nWelcome to PoWoW, " + userName + ".");
                            displaySuccess("You are now registered. Welcome to PoWoW, " + USER_ID + ".");
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
                            //alert("FAILED TO REGISTER PoWoW ACCOUNT FOR [" + userName + "]\nTry again with different user name.");
                            displayFormError(
                                "Failed to register", 
                                "Username is already taken.  Please try a different username."
                            );
                        }//end else
                    });
                },//end function
                error: function(jqXHR, textStatus, errorThrown){
                    displayAJAXError(
                          "Something went wrong when attempting to register",
                          jqXHR, textStatus, errorThrown                  
                    );
                }//end function
            });
        }//end else
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
    debugln("  checking comment length...");
    if(comment.length <= MAX_COMMENT_LENGTH){
        comment = encodeURIComponent(comment);
        //alert(comment);
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
                        displayFormError(
                            "An unknown error occurred while posting answer",
                            "Please try again."
                        );
                    }//end else
                });
            },//end function
            error: function(jqXHR, textStatus, errorThrown){
                displayAJAXError(
                      "Something went wrong when posting answer",
                      jqXHR, textStatus, errorThrown                  
                );
            }//end function
        });
    }//end if
    else{
        displayFormError(
            "Answer is too long",
            "Limit your answer to [" +
            MAX_COMMENT_LENGTH +
            "] characters"
        );
    }//end else
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
    //alert("making question URI safe");
    var ques = $("#ask-form-question").val();
    ques = encodeURIComponent(ques);
    debugln("  question: [" + ques + "]");
    debugln("  getting more info...");
    //alert("making question details URI safe");
    var quesMore = $("#ask-form-more").val();
    quesMore = encodeURIComponent(quesMore);
    //alert("everything safe");
    debugln("  more: [" + quesMore + "]");
    debugln("  attempting to post question...");
    //alert("username: [" + userName + "]\ncategory: [" + cat + "]\nquestion: [" + ques + "]\nMore: [" + quesMore + "]");
    var validQuesLength = (ques.length <= MAX_QUESTION_TITLE_LENGTH);
    var validQuesMoreLength = (quesMore.length <= MAX_QUESTION_DETAILS_LENGTH);
    var validLength = (validQuesLength && validQuesMoreLength);
    if(validLength){
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
                        //alert("POSTED! :D [" + val.qID + "]");
                        debugln("  clearing form data...");
                        $("#ask-form-question").val("");
                        $("#ask-form-more").val("");
                        $("#ask-form-cat > input").each(function(){
                            $(this).prop("checked", false);
                        });
                        //alert("postQuestion id: [" + val.qID + "]");
                        hideContent();
                        $("#post").show(250);
                        showPost(val.qID);
                    }//end if
                    else{
                        displayFormError(
                            "An unknown error occurred while posting question",
                            "Please try again."
                        );
                    }//end else
                });
            },//end function
            error: function(jqXHR, textStatus, errorThrown){
                displayAJAXError(
                      "Something went wrong when posting question",
                      jqXHR, textStatus, errorThrown                  
                );
            }//end function
        });
    }//end if
    else{
        if(!validQuesLength){
            displayFormError(
                "Question too long.",
                "Limit your question to [" +
                MAX_QUESTION_TITLE_LENGTH +
                "] characters. Use the More information field " +
                "if you need more room."
            );
        }//end if
        else{
            displayFormError(
                "Question information too long.",
                "Limit your question to [" +
                MAX_QUESTION_DETAILS_LENGTH +
                "] characters. Consider condensing your question."
            );
        }//end else
    }//end else
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
            if((json_data.length === 1) && (json_data[0].returned === "false")){
                $("#post-comment-section").append(
                    "<span style=\"font-size: 10px; color: #3F3F41\">" +
                    "No answers available... Be the first to answer this question!" +
                    "</span>"
                );
            }//end if
            else{
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
            }//end else
        },//end function
        error: function(jqXHR, textStatus, errorThrown){
            displayAJAXError(
                  "Something went wrong when retrieving answers",
                  jqXHR, textStatus, errorThrown                  
            );
        }//end function
    });
    debugln("END showComments");
}//end function

function showPost(id){
    debugln("BEGIN showPost");
    //alert("showPost id: [" + id + "]");
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
        },//end function
        error: function(jqXHR, textStatus, errorThrown){
            displayAJAXError(
                  "Something went wrong when retrieving question information",
                  jqXHR, textStatus, errorThrown                  
            );
        }//end function
    });
    debugln("END showPost");
}//end function