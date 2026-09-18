const http = require("http");
const fs = require("fs");
const path = require("path");

const publicDirectory = path.join(__dirname, "..", "public");

function sendFile(res, fileName, contentType) {
  const filePath = path.join(publicDirectory, fileName);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Unable to load file");
      return;
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(content);
  });
}

function createApp() {
  return http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
      sendFile(res, "index.html", "text/html");
      return;
    }

    if (req.url === "/styles.css" && req.method === "GET") {
      sendFile(res, "styles.css", "text/css");
      return;
    }

    if (req.url === "/health" && req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");

      res.end(
        JSON.stringify({
          status: "healthy",
          uptime: process.uptime(),
          timestamp: new Date().toISOString()
        })
      );

      return;
    }

    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: "Route not found"
      })
    );
  });
}

module.exports = createApp;