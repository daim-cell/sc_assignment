const http = require('http');
var render = require("./render");
var commonHeader = { 'Content-Type': 'html' };
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	home(req,res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function home(req, res) {
  if (req.url === "/") {
    if (req.method.toLowerCase() === "get") {
      res.writeHead(200, commonHeader);
      render.view("overview", res);
      res.end();
    } else {
      req.on("data", function (postBody) {
        var query = querystring.parse(postBody.toString());
        res.writeHead(303, { "location": "/" + query.username });
        res.end();
      })
    }
  }
}