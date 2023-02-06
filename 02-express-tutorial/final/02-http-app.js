const http = require("http");
const { readFileSync } = require("fs");

//Get all files
const homePage = readFileSync("./navbar-app/index.html");
const homeStyles = readFileSync("./navbar-app/styles.css");
const homeImage = readFileSync("./navbar-app/logo.svg");
const homeLogic = readFileSync("./navbar-app/browser-app.js");

const server = http.createServer((req, res) => {
  const url = req.url;
  res.writeHead(200, { "content-type": "text/html" });
  console.log(url);
  //This is the home page
  if (url === "/") {
    res.write(homePage);
  }
  //About page
  else if (url === "/about") {
    res.write("<h1>This is our about page</h1>");
  } 
  //styles-css
  else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
  }
  //logo
  else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeImage);
  }
  //logic for the site
  else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeLogic);
  }
  //Return 404 error
  else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h1>Bad Request!</h1>");
  }
  res.end();
});

server.listen(3000);
