const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model");

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000, // 10mins
  sameSite: "strict",
  signed: true,
};

function createUser(username, password) {
  const sid = crypto.randomBytes(18).toString("base64");
  return bcrypt
    .hash(password, 10)
    .then((hash) => model.createUser(username, hash))
    .then((user) => model.createSession(sid, { user }));
}

function verifyUser(username, password) {
  return model
    .getUser(username)
    .then((user) => {
      //user does not exist
      if (user === undefined) {
        console.error("user does not exist");
        return false;
      }
      // user exist
      else {
        return bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            const sid = crypto.randomBytes(18).toString("base64");
            return model.createSession(sid, { user }).then((result) => result);
          }
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = { createUser, COOKIE_OPTIONS, verifyUser };
