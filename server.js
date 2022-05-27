const express = require("express");
const itemsRoute = require("./routes/items");
const signupRoute = require("./routes/signup");
const logger = require("./middleware/logger");
const model = require("./database/model");

const server = express();
const staticHandler = express.static("public");
const bodyParser = express.urlencoded({ extended: true });

server.use(staticHandler);
server.use(bodyParser);
server.use(logger);

server.get("/signup", signupRoute.get);
server.post("/signup", signupRoute.post);
server.get("/items", itemsRoute.get);
server.post("/items", itemsRoute.post);

//catch-all handler
server.use((request, response) => {
  response.status(404).send("<h1>Not found</h1>");
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
