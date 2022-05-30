function html(title, body) {
  return /*html*/ `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>${title}</title>
  <script defer src='script.js'></script>
  <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body>
    ${body}
</body>
</html>
`;
}

module.exports = { html };
