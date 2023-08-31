const http = require("http");   // 导入http模块

const app = require("./backend/app");       //导入express应用
const port = 3000;

app.set("port", port);
const server = http.createServer(app); 

server.listen(port);