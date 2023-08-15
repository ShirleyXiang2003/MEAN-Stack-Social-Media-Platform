const http = require("http");   // 拿到这个http
const server = http.createServer((req, res) => ({
    res.end("response from backend");
}
);