// const fs = require('fs')

// fs.readFile('what-i-bought.txt','utf8',(err,data)=>{
//     console.log(data)
// });

const items = require("./items");

console.log(items);

const express = require("express");

const server = express();

const staticHandler = express.static("public");

const bodyParser = express.urlencoded({ extended: true });

const logger = (request, response, next) => {
  console.log(request.method + " " + request.url);
  next();
};

server.use(staticHandler);

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
        <form>
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

server.post("/", bodyParser, (request, response) => {
  console.log(request.body);
  response.redirect("/");
});

//catch all handler
server.use((request, response) => {
  response.status(404).send("<h1>Not found</h1>");
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
