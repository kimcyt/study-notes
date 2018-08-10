//async.waterfall 會按照順序執行 function

class db {
    setupDb() {
        var self = this;
        async.waterfall([     //async.series 一样用法，可将所有result 堆叠成array在最后
            function(callback) { //callback is next
                self.connectToRethinkDbServer(function(err,connection) {
                    if(err) {
                        return callback(true,"Error in connecting RethinkDB");
                    }
                    callback(null,connection); //pass connection to next function, can pass more than one param
                });
            },
            function(connection,callback) {    //pass to here
                rethinkdb.dbCreate('polls').run(connection,function(err, result) {
                    if(err) {
                        console.log("Database already created");
                    } else {
                        console.log("Created new database");
                    }
                    callback(null,connection);
                });
            },
            function(connection,callback) {
                rethinkdb.db('polls').tableCreate('poll').run(connection,function(err,result) {
                    connection.close();
                    if(err) {
                        console.log("table already created");
                    } else {
                        console.log("Created new table");
                    }
                    callback(null,"Database is setup successfully"); //pass to the function outside waterfall as data
                });
            }
        ],function(err,data) {  //pass to here as data   // err collects all the errors in the waterfall functions
            console.log(data);
        });
    }
}

/*
async.forever
使用時機 :
一直做某件事情
直到發生錯誤
 */
// 重複執行 func1
forever(function(next){

    func1(function(err){
        setTimeout(10000, function(){ // 執行完之後過 10 秒再 call next
            next(err);                // 這樣就可以間隔 10 秒
        });
        //next(err);  // 如果有 err 就停止然後跳到下面
    });             // 沒 err 就繼續執行


}, function(err){   // <-- 有 err 的話跑到這裡
    console.log(err);
});
