const express = require("express"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");


router.post("/signup", (req, res, next) => {
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

router.post("/login", (req, res, next) =>{
  let fetchedUser;
  User.findOne({ email: req.body.email}).then((user) =>{
    if (!user) {    // 如果没有找到username
      return res.status(401).json({
        message: "Auth failed",   
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);    // 如果找到了，和数据库的password做一下比较
  })
  .then((result) =>{
    console.log(result);
    if (!result) {    // 如果password不对
      return res.status(401).json({
        message: "Auth failed",
      });
    }

    // 如果成功了
    const token = jwt.sign(
      { email: fetchedUser.email, userId: fetchedUser._id},
      "socialMediaApp",
      { expiresIn: "1h"}
    );
    console.log(token);
    res.status(200).json({ token: token});
  })
  .catch((err) => {   //  如果还有什么错误的话
    return res.status(401).json({
      message: "Auth failed",
    })
  })
});

module.exports = router;
