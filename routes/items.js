const layout = require("../layout");
const items = require("../items");
const itemList = Object.values(items);

function get(request, response) {
  let items = "";
  for (let item of itemList) {
    items += `<li>${item.name} / ${item.purchase_date}</li>`;
  }
  const body = /*html*/ `
    <h1>what-i-bought</h1>
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
  response.send(/*html*/ `
        ${layout.html("items", body)}
        `);
}

function post(request, response) {
  itemList.push(request.body);
  response.redirect("/items");
}

module.exports = { get, post };
