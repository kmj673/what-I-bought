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
    console.log(images);
    for (let image of images) {
      img += `<li><img src="/image/${image.id}" alt="" width="64" height="64"></li>`;
    }
    console.log(img);
  });

  let body = /*html*/ `
      <h1>what-i-bought</h1>
        ${buttons}
        <ul>${img}</ul>
      <div>
      <form action="/image" method="POST" enctype="multipart/form-data">
        <label for="image">Image: </label>
        <input name="image" id="image" type='file'/>
        <button type="submit">submit</button>
      </form>
      </div>
    `;
  response.send(layout.html("home", body));
}

function post(request, response) {
  // itemList.push(request.body);
  response.redirect("/home");
}

module.exports = { get, post };
