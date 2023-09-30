const express = require("express");     // 导入express模块
const bodyParser = require("body-parser");      // 导入body-parser模块
const mongoose = require("mongoose");       // 导入mongoose模块
const Post = require("./models/post");
const multer = require("multer");
const path = require("path");
const User = require("./models/user");
const bcrypt = require("bcrypt");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/ipg": "jpg",
};

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

app.use("/images", express.static(path.join("backend/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");   // 一旦有文件来，就存在images里面
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");  // 用横线分隔开
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + extension);
  },
})

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
//===============================================================================================
//GET 请求处理
app.get("/api/posts/", (req, res, next)=> {
    Post.find().then((responseData) => {
        console.log("Received GET request", responseData);
        res.json({
          message: "success",
          body: responseData,
        });
    });
});

//===============================================================================================
// POST 请求处理
app.post("/api/posts", 
multer({ storage: storage}).single("image"), 
(req, res, next) => {
    // 现在你可以访问req.body来获取POST请求中的数据
    console.log("Received POST request", req.body);
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        // http://localhost:3000/images-time.png
    });
    post.save().then((result) => {
        console.log(result);
        res.status(201).json({
          message: "success v1",
          pos: {
            id: result._id,
            title: result.title,
            content: result.content,
            imagePath: result.imagePath,
          }
        });
    });
});

//===============================================================================================
// PUT 请求处理
app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Update successfully!" });
  });
});

//===============================================================================================
// DELETE 请求处理
app.delete("/api/posts/:id", (req, res, next)=>{
    Post.deleteOne({ _id: req.params.id })
    .then((result) => {     // 如果删除成功了
        console.log("delete successfully", req.params.id);
        res.status(200).json({message: "Post Deleted"});
    })
    .catch((error) => {     //  如果没有删除成功
        console.log("error", error);
    })
});

// 取一个
app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(201).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

app.post("/api/user/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) =>{
    console.log(hash);
    const user = new User({
      email: req.body.email,
      password: hash,
    });

    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

module.exports = app;