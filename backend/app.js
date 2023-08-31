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