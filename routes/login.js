const layout = require("../layout");
const model = require("../database/model");
const auth = require("../auth");

function get(request, response) {
  const body = /*html */ `
  <h1>Login</h1>
    <form method="POST">
    <label for="username">Username </label>
    <input type="text" id="username" name="username" />
    <label for="password">Password </label>
    <input type="password" id="password" name="password" />
    <button type="submit">Login</button>
    </form> 
  `;
  response.send(layout.html("Login", body));
}

function post(request, response) {
  const { username, password } = request.body;
  return auth
    .verifyUser(username, password)
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS).redirect("/home");
    })
    .catch((error) => {
      console.error("unexpected error happened");
      response.send("unexpected error, ", "<a href='/signup'>Sign up</a>");
    });
}

module.exports = { get, post };
