const test = require("node:test");
const assert = require("node:assert");
const createApp = require("../src/app");

test("GET / returns a welcome message", async () => {
  const server = createApp();

  await new Promise((resolve) => {
    server.listen(0, resolve);
  });

  const port = server.address().port;
  const response = await fetch(`http://localhost:${port}/`);
  const data = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(data.message, "Hello from the DevOps Node.js app");

  server.close();
});

test("GET /health returns healthy status", async () => {
  const server = createApp();

  await new Promise((resolve) => {
    server.listen(0, resolve);
  });

  const port = server.address().port;
  const response = await fetch(`http://localhost:${port}/health`);
  const data = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(data.status, "healthy");

  server.close();
});