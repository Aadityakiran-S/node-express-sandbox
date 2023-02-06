const http = require("http");
// const {readFileSync} = require('fs');

//Get all files
// const homePage = readFileSync('./index.html');

const server = http.createServer((req, res) => {
  const url = req.url;
  res.writeHead(200, { "content-type": "text/html" });
  //This is the home page
  if (url === "/") {
    res.write("<h1>Welcome to our home page</h1>");
  }
  //About page
  else if (url === "/about") {
    res.write("<h1>This is our about page</h1>");
  }
  //Return 404 error
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Bad Request!</h1>");
  }
  res.end();
});

server.listen(3000);
