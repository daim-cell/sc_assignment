const http = require('http');
var render = require("./render");
var detail = require('./detail')
var commonHeader = { 'Content-Type': 'html' };
const hostname = '127.0.0.1';
var url=  require('url');
const port = 3000;

const server = http.createServer((req, res) => {
	console.log('On server');
	laptop(req,res);
	home(req,res);

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function home(req, res) {
if (req.url === "/") {
	console.log('Home called');
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

function laptop(req, res) {
  const queryObject = url.parse(req.url,true).query;
  id=queryObject.id;
  console.log(id);
  if (id > -1) {
    if (req.method.toLowerCase() === "get") {
      res.writeHead(200, commonHeader);
      detail.view("laptop", res, id);
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