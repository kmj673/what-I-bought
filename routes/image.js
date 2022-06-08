const model = require("../database/model");

function post(request, response) {
  model.createPost(request.file.buffer).then((result) => {
    response.redirect("/");
  });
}

function get(request, response) {
  model.getImg(request.params.id).then((result) => {
    const bytes = result.img;
    response.type("image/png").send(bytes);
  });
}

module.exports = { get, post };
