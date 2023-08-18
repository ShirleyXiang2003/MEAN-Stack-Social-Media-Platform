const express = require("express");     // 导入express模块

const app = express();    // 创建express应用 

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
app.use("/api/posts",(req, res, next) => {      // 定义一个路由处理程序，当访问路径为"/api/posts"时，会执行这个处理程序
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


// app.use((req, res, next) => {
//     res.send ("hello from express.");
// })

module.exports = app;