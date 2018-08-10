////////////////connect to database

let mongo = require("mongoose");
mongo.connect("mongodb://localhost/test");  //name of the database --- use test

//listen to events
const db = mongo.connection;
db.on("error", function (e) {
    console.log(e);
});

db.once("open", function () {
    console.log("connection established");
});

db.once("close", ()=>{
    console.log("connection ended")
});

//create schema object
let Schema = mongo.Schema;
let test_schema = new Schema({
    name: String,
    age: Number,
    sex:{
        type:String,
        default:"male"
    },
    chat: String
});

//create model in the specified collection(same as mongos document)
let test_model = mongo.model("test", test_schema);
//test is the name of the collection in the current database, automatically convert to plural in the system



/////////////////////insert document(mongos data)
test_model.create({
    name: "whoever",
    age:30,
    chat: "i dont know lol"
}, (err, data)=>{
    //if insertion failed, an error returns
    if(err){
        console.log(err);
        throw err;
    } else{
        console.log("insertion completed", data);
    }
});

//another way is to create a new document object, perform operations on it, and then use save() to submit changes
const kim = new test_model({
    name: "kim",
    age:30,
    chat: "i dont know lol"
});

kim.save().then(console.log, console.error);


//////////////////////////CURD
test_model.create([
    {name: "jason", age:20, chat: "happy date"},
    {name: "sam", age:34, chat: "to good at goodbye"},
    {name: "kelly", age:10, chat: "i am not afraid"},
    {name: "smith", age:40, chat: "i am not the only one"}
], (err)=>{
    if(!err){
        console.log("insertion completed");
    } else{
        throw err;
    }
});

///////find
//test_model.find({name:"kelly"})
test_model.find({},{name:1, _id:0}, {skip:2, limit:5}, (err, docs)=>{ //the first param is {}, means no filter, search all
    // the second param represents columns to be displayed, can be written as "name _id", to remove id, add"-id"
    //the third argument sets the rows to be displayed
    if(!err){
        console.log(docs);
    } else{
        console.log(err);
    }
});  //list all the names

///////update

//test_model.update(conditions, doc, options, callback)
test_model.update({name: "kim"}, {$set: {age: 54}}, {multi: true},  err=>{

});


///////delete / remove

