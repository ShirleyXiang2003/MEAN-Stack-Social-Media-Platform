const express = require("express");  
const bodyParser = require("body-parser");    
const mongoose = require("mongoose");       
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const path = require("path");

const app = express();    // 创建 web 服务器
app.use(bodyParser.json());     // 使用body-parser中间件来解析JSON格式的请求体数据

mongoose
  .connect(
    "mongodb+srv://xiangzhushan:3evfbpP9xp3dtiIf@demoapp.y3oiu53.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connect successfully");
  })
  .catch(() => {
    console.log("connect failed");
  });

//===============================================================================================
app.use((req, res, next) => {       // CORS中间件,所有传输到3000端口的东西都要做这个处理
    res.setHeader("Access-Control-Allow-Origin", "*");      // 设置响应头，*代表来自任何源的跨域请求
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Request-Width, Content-Type, Accept"
    );

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS" 
    );
    next();
})

app.use("/images", express.static(path.join("backend/images")));
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;