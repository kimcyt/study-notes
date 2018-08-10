
var employee = {},
    res = {};

var search = async (ctx, next)=>{
    console.log(ctx.request.url);
    var emp = ctx.params["employee"];
    if(typeof emp === "object" && emp["id"]){
        ctx.response.body = employee[emp["id"]];
    } else if (employee[emp]) {
        ctx.response.body = "employee " + emp + " found. ";
        ctx.response.body += JSON.stringify(employee[emp]);
    } else{
        ctx.response.body = "No such employee. Please try again.";
    }
}

var add = async (ctx, next)=>{
    var newEmployee = ctx.request.body.action;
    console.log(newEmployee);
    console.log(typeof newEmployee);
    if(typeof newEmployee === "object" && newEmployee["id"]){
        if(employee[newEmployee["id"]]){
            ctx.response.body = "Employee id already exists";
        } else {
            employee[newEmployee["id"]] = newEmployee;
            ctx.response.body = "Employee " + newEmployee["id"] + " is added. ";
            ctx.response.body += JSON.stringify(employee);
        }
    } else{
        ctx.response.body = "Invalid employee object.";
    }
};

var deleteUser = async (ctx, next)=>{
    console.log(ctx.request.url); //json object 被bodyParser转成object, action为user_input的key
    var removedEmployee = ctx.request.body.action,
        removeID;
    if(typeof removedEmployee !== "object" ){
        removeID = removedEmployee;
    } else{
        removeID = removedEmployee["id"];
    }
    if(employee[removeID]){
        delete employee[removeID];
        ctx.response.body = "Employee " + removeID + " is deleted successfully. ";
        ctx.response.body += JSON.stringify(employee);
    } else{
        ctx.response.body = "Employee does not exist.";
    }
};

var update = async(ctx, next)=> {
    var updatedEmployee = ctx.request.body.action;
    if (typeof updatedEmployee !== "object") {
        ctx.response.body = "Invalid employee object.";
    }  else {
        if(!updatedEmployee["id"] || !employee[updatedEmployee["id"]]){
            ctx.response.body = "PLease specify the employee ID to be updated.";
            return;
        }
        for (let key in updatedEmployee) {
            employee[updatedEmployee["id"]][key] = updatedEmployee[key];
        }
        ctx.response.body = "Employee " + updatedEmployee["id"] + " has been updated. ";
        ctx.response.body += JSON.stringify(employee);
    }

}

module.exports = {
    /*
    冒号后的employee自动成为var加到ctx.params
     */
    "/search/:employee": search,
    "/add": add,
    "/delete": deleteUser,
    "/update": update
};