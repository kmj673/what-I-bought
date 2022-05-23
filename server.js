// const fs = require('fs')

// fs.readFile('what-i-bought.txt','utf8',(err,data)=>{
//     console.log(data)
// });

const items = require("./items");

const itemArray = Object.values(items);

function getItem(itemArray) {
  let itemList = "";
  for (let item of itemArray) {
    itemList += `<li>${item.name} / ${item.purchase_date}</li>`;
  }
  return itemList;
}

const express = require("express");

const server = express();

const staticHandler = express.static("public");

const bodyParser = express.urlencoded({ extended: true });

const logger = (request, response, next) => {
  console.log(request.method + " " + request.url);
  next();
};

server.use(staticHandler);
server.use(bodyParser);
server.use(logger);

server.get("/", (request, response) => {
  const htmlHead = /*html*/ `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>what-i-bought</title>
      <link rel="stylesheet" href="style.css" type="text/css">
    </head>
    `;
  response.send(/*html*/ `
    ${htmlHead}
    <body>
        <h1>what-i-bought</h1>
        ${getItem(itemArray)}
        <form method="POST">
            <label for="name">Name: </label>
            <input name="name" id="name" type='text'/>
            <label for="purchase_date">Date: </label>
            <input name="purchase_date" id="purchase_date" type='date'/>
            <button type="submit">Submit</button>
        </form>
    </body>
    </html>
    `);
});

server.post("/", (request, response) => {
  itemArray.push(request.body);
  response.redirect("/");
});

//catch-all handler
server.use((request, response) => {
  response.status(404).send("<h1>Not found</h1>");
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
