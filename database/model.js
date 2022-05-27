const db = require("./connection");

function createUser(username, hash) {
  const create_user = /*sql*/ `INSERT INTO users (username,password) VALUES($1,$2);`;
  return db
    .query(create_user, [username, hash])
    .then(() => console.log("did add user in db"));
}

module.exports = { createUser };
