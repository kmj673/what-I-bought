const layout = require("../layout");
const items = require("../items");
const itemList = Object.values(items);

function get(request, response) {
  console.log(request.signedCookies.sid);
  let items = "";
  for (let item of itemList) {
    items += `<li>${item.name} / ${item.purchase_date}</li>`;
  }
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

  const body = /*html*/ `
    <h1>what-i-bought</h1>
    ${buttons}
    <div>      
      <ul>
        ${items}
      </ul>
    </div>
    <div>
      <form method="POST">
        <label for="name">Name: </label>
          <input name="name" id="name" type='text'/>
        <label for="purchase_date">Date: </label>
          <input name="purchase_date" id="purchase_date" type='date'/>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div>
      <form method='POST' action='/search'>
        <label for="search">Search: </label>
          <input name="search" id="search" type='text'/>
        <button type="submit">Submit</button>
      </form>
    </div>
    `;
  response.send(layout.html("home", body));
}

function post(request, response) {
  itemList.push(request.body);
  response.redirect("/home");
}

module.exports = { get, post };
