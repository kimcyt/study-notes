const express = require("express");
const app = express();

//用模板渲染：ejs
//建立views 文件夹， 放入ejs文件
//指定视图所在位置
app.set("views", "./views");

//注册模板引擎
app.set("view engine", "ejs");

//匹配url和模板,注入动态数据到界面，这里为GET例子
app.get("url", (req, res)=>{
    res.render("index", data);//data 放到 model 文件夹里面作为json文件，用fs读取

    //跳转到另一个页面
    res.redirect();
});