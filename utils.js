const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

function generateToken(payload) {
  const token = jsonwebtoken.sign(payload, "SECRET", {
    expiresIn: "7d",
  });
  return token;
}

class Bcrypt {
  static hash(pwd) {
    const hashedPwd = bcryptjs.hashSync(pwd);
    return hashedPwd;
  }

  static verify(hash, pwd) {
    const result = bcryptjs.compareSync(pwd, hash);
    return result;
  }
}

module.exports = {
  Bcrypt,
  generateToken,
};
