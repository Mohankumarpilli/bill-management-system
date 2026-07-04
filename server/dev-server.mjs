import http from "node:http";
import menuHandler from "../api/menu.js";
import ordersHandler from "../api/orders.js";

const routes = {
  "/api/menu": menuHandler,
  "/api/orders": ordersHandler,
};

function attachHelpers(req, res, query) {
  req.query = query;
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (data) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
  };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const handler = routes[url.pathname];
  if (!handler) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  attachHelpers(req, res, Object.fromEntries(url.searchParams));

  if (req.method === "POST" || req.method === "PUT") {
    let body = "";
    for await (const chunk of req) body += chunk;
    req.body = body ? JSON.parse(body) : {};
  }

  try {
    await handler(req, res);
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal server error" }));
  }
});

const port = process.env.API_PORT || 3001;
server.listen(port, () => console.log(`API dev server listening on :${port}`));
