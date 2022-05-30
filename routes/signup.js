const layout = require("../layout");
const model = require("../database/model");
const auth = require("../auth");

function get(request, response) {
  const form = /* html */ `
    <h1>Sign up</h1>
    <form method='POST'>
        <label for="username">Username: </label>
        <input id="username" name="username" type="text" required>
        <label for="password">Password: </label>
        <input id="password" name="password" type="password" required>
        <button type="submit">Submit</button>
    </form>
    `;
  response.send(layout.html("signup", form));
}

function post(request, response) {
  const { username, password } = request.body;
  model
    .getUser(username)
    .then((user) => {
      //if user already exist
      if (user !== undefined) {
        response.redirect("/signup");
      }
      // if user not exist then create new user
      else {
        auth
          .createUser(username, password)
          .then((sid) =>
            response.cookie("sid", sid, auth.COOKIE_OPTIONS).redirect("/home")
          );
      }
    })
    .catch((error) => {
      console.error("unexpected error happened");
      response.send("unexpected error, ", "<a href='/signup'>Sign up</a>");
    });
}

module.exports = { get, post };
