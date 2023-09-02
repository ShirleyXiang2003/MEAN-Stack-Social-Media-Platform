const express = require("express");     // 导入express模块

const app = express();    // 创建 web 服务器

app.use((req, res, next) => {       // CORS中间件
    res.setHeader("Access-Control-Allow-Origin", "*");      // 设置响应头，*代表来自任何源的跨域请求
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-Width, Content-Type, Accept"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS" 
    );
    next();
})

// step 1: which methods? GET? POST? DELETE? PUT?
//GET
app.get("/api/posts", (req, res)=> {
    // step 2: console.log(req) is fine, since we don't have db yet
    console.log("Received GET request", req);
    const posts = [
        {
            id: "1",
            title: "1st title from server",
            content: "1st content from server",
        },
        {
            id: "2",
            title: "2nd title from server",
            content: "2nd content from server",
        },
    ];
    // step 3: how to add response?
    res.json({
        message: "GET request successful",
        body: posts,
    });
});

app.use("/api/posts",(req, res, next) => {      // 定义一个路由处理程序
    const posts = [
        {
            id: "1",
            title: "1st title from server",
            content: "1st content from server",

        },
        {
            id: "2",
            title: "2nd title from server",
            content: "2nd content from server",
        }
    ]
    res.json({
        message:"success",          // key - value
        body: posts,       
    })
})


module.exports = app;