const http = require("http");   // 导入http模块

const app = require("./backend/app");       //导入express应用
const port = 3000;      // 定义端口

app.set("port", port);      // 将断口设置到应用里
const server = http.createServer(app); 

server.listen(port);