
const http = require("node:http");

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/health") {
        res.writeHead(200);
        res.end(JSON.stringify({
            status: "ok",
            service: "CloudShip"
        }));
        return;
    }

    if (req.url === "/") {
        res.writeHead(200);
        res.end(JSON.stringify({
            service: "CloudShip",
            message: "Application delivery automation"
        }));
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({
        error: "Not found"
    }));
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`CloudShip listening on port ${PORT}`);
});
