const model = require("../database/model");

function post(request, response) {
  model.deletePost(request.body.delete).then(() => response.redirect("/"));
}

module.exports = { post };
