/*
request handlers are to be used by the router to respond to different
requests, instead of passing them to server and then to be used by the
router, we use js object to do so.
*/


var exec = require("child_process").exec; //get the function exec() from the module

var querystring = require("querystring"); //for extracting data from the submitted request

function start(response, postData){
    console.log("handler start called");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        //action specifies the url which it is directing to once submitted
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+ //specify input type and submit button
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    //if use text/plain, browser will interpret all the content as plain text
    response.write(body);
    response.end(); //write the command output to display
    /*
    //since stdout is required for the rest of the code, function will be run before it ends
    exec("ls -lah", function(error, stdout, stderr){
        response.writeHead(200, {"Content-Type": "text/plain"}); //send http header info
        response.write(stdout);
        console.log("output: " + stdout);
        response.end(); //write the command output to display
    })

    wrong example for using non-block functions. The function passed in as a parameter
    is used as a callback function. So when the program runs the rest of the code-return
    content, the content is still empty because the callback function hasnt been called.

    var content = "empty"; //content to be displayed on the web
    exec("ls -lah", function(error, stdout, stderr){ //run shell command to list all files in current dir
        content = stdout; //set the content to be the command output
    })
    return content;
    */
}

function upload(response, postData){
    console.log("handler upload called")
    response.writeHead(200, {"Content-Type": "text/plain"}); //send http header info
    response.write("you have sent " +
        querystring.parse(postData).text); //extract the submitted text
    response.end(); //write the command output to display
}

exports.start = start;
exports.upload = upload;