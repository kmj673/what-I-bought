const model = require("../database/model");

function post(request, response) {
  console.log(request.file);
  model.createPost(request.file.buffer).then((result) => {
    response.redirect("/home");
  });
}

function get(request, response) {
  console.log(request.params.id);
  model.getImg(request.params.id).then((result) => {
    console.log(result);
  });
}

module.exports = { get, post };
