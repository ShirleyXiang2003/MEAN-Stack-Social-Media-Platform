const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];      //  空格隔开，取后面那个-> 'bearer token'
    console.log("token is", token);
    jwt.verify(token, "socialMediaApp");        // 拿着密钥和token去验证
    next();
  } catch (error) {
    console.log("error", error);
    res.status(401).json({ message: "Authentication fails" });
  }
};