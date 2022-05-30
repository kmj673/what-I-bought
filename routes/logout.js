function post(request, response) {
  response.clearCookie().redirect("/home");
}

module.exports = { post };
