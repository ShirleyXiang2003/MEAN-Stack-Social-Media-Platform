const express = require("express");   
const router = express.Router();
const Post = require("../models/post");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/ipg": "jpg",
  };

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
//GET 请求处理
router.get("", (req, res, next)=> {
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
router.post("", checkAuth,
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
router.put("/:id", checkAuth, (req, res, next) => {
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
router.delete("/:id", checkAuth, (req, res, next)=>{
    Post.deleteOne({ _id: req.params.id })
    .then((result) => {     // 如果删除成功了
        console.log("delete successfully", req.params.id);
        res.status(200).json({message: "Post Deleted"});
    })
    .catch((error) => {     //  如果没有删除成功
        console.log("error", error);
    })
});

//===============================================================================================
// 取其中一个
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(201).json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  });
});

module.exports = router;
