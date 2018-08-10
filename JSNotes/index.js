//import the module from the same project so that server has access
//to all the exported methods of this module.
var server = require("./HTTPServer");
var router = require("./router");
var requestHandlers = require("./requestHandelers");
//we have the router object so that we can route() things anywhere in main
//by passing in the methods of the router instead of router itself

//create a dictionary and set each url type as a key, response handler
//as the value
var handler = {};
//when assigning function as a value, cannot include the bracket
//or it will run as a function instead of being assigned as a value
handler["/"] = requestHandlers.start;
handler["/start"] = requestHandlers.start;
handler["/upload"] = requestHandlers.upload; //when user upload sth, it goes to /upload

server.start(router.route, handler);