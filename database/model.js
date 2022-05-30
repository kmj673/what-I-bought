const db = require("./connection");

function getUser(username) {
  const query_text = /*sql*/ `SELECT * FROM users WHERE username = $1;`;
  return db.query(query_text, [username]).then((result) => result.rows[0]);
}

function createUser(username, hash) {
  const query_text = /*sql*/ `INSERT INTO users (username,password) VALUES($1,$2) RETURNING id, username, password;`;
  return db
    .query(query_text, [username, hash])
    .then((result) => result.rows[0]);
}

function createSession(sid, user) {
  const query_text = /*sql*/ `INSERT INTO sessions (sid,data) VALUES($1,$2) RETURNING sid;`;
  return db.query(query_text, [sid, user]).then((result) => result.rows[0].sid);
}

module.exports = { getUser, createUser, createSession };
