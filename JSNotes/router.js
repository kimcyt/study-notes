/*
based on different url, the router responds to it accordingly
 */

function route(pathname, handle, response, postData){
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function'){
        //if the handler(as a function) exists
        handle[pathname](response, postData); //execute the handler, let the handler deals with the response
    } else {
        console.log("no request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"}); //send http header info
        response.write("404 Not Found");
        response.end(); //finish response
    }

}
exports.route = route;