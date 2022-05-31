// routes
const homeRoute = require("./routes/home");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const logoutRoute = require("./routes/logout");
const imageRoute = require("./routes/image");

//express
const express = require("express");
const app = express();
const staticHandler = express.static("public");
const bodyParser = express.urlencoded({ extended: true });

//middleware
const logger = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ dest: "uploads/", storage: storage });

app.use(staticHandler);
app.use(bodyParser);
app.use(logger);
app.use(cookieParser(process.env.COOKIE_SECRET));

//app route handler
app.get("/home", homeRoute.get);
app.post("/home", homeRoute.post);
app.get("/signup", signupRoute.get);
app.post("/signup", signupRoute.post);
app.get("/login", loginRoute.get);
app.post("/login", loginRoute.post);
app.post("/logout", logoutRoute.post);
app.post("/image", upload.single("image"), imageRoute.post);
app.get("/image/:id", imageRoute.get);

//catch-all handler
app.use((request, response) => {
  response.status(404).send("<h1>Not found</h1>");
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
