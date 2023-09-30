const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },        // 确保这个email是独一无二的
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);