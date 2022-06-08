const layout = require("../layout");
const model = require("../database/model");

// const items = require("../items");
// const itemList = Object.values(items);

function get(request, response) {
  let buttons = "";
  if (request.signedCookies.sid === undefined) {
    buttons = /*html*/ `
    <a href="/signup">Sign up</a>
    <a href="/login">Log in</a>
    `;
  } else {
    buttons = /*html*/ `
    <a href="/items">My items</a>
    <form method='POST' action='/logout'>
      <button type='submit'>Logout</button>
    </form>
    `;
  }

  let img = "";
  model.getPosts().then((images) => {
    for (let image of images) {
      img += /*html*/ `
      <li>
        <img style="display:inline" src="/image/${image.id}" alt="${image.id}" width="64" height="64">
        <form action="/delete" method = "POST" style="display:inline">
          <button type="submit" name="delete" value="${image.id}">&times;</button>
        </form>
      </li><br>`;
    }
    let body = /*html*/ `
    <h1>what-i-bought</h1>
      ${buttons}
      <div>
        <form action="/image" method="POST" enctype="multipart/form-data">
          <label for="image">Image: </label>
          <input name="image" id="image" type='file'/>
          <button type="submit">submit</button>
        </form>
      </div>
      <ul>${img}</ul>
  `;
    response.send(layout.html("home", body));
  });
}

function post(request, response) {
  // itemList.push(request.body);
  response.redirect("/");
}

module.exports = { get, post };
