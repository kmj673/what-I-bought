const layout = require("../layout");
const bcrypt = require("bcryptjs");
const model = require("../database/model");

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
  response.send(/*html*/ `${layout.html("signup", form)}`);
}

function post(request, response) {
  const { username, password } = request.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      model.createUser(username, hash);
    })
    .then(() => response.redirect("/items"));
}

module.exports = { get, post };
