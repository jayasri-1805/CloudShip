
const { test } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { spawn } = require("node:child_process");

test("CloudShip health endpoint returns a healthy response", async (t) => {
    const port = 3100 + Math.floor(Math.random() * 1000);

    const serverProcess = spawn(
        process.execPath,
        ["src/server.js"],
        {
            env: { ...process.env, PORT: String(port) },
            stdio: "ignore"
        }
    );

    t.after(() => {
        serverProcess.kill();
    });

    let response;

    for (let attempt = 0; attempt < 30; attempt++) {
        try {
            response = await new Promise((resolve, reject) => {
                const request = http.get(
                    `http://127.0.0.1:${port}/health`,
                    resolve
                );

                request.on("error", reject);
                request.setTimeout(500, () => request.destroy());
            });

            break;
        } catch {
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }

    assert.ok(response, "Server did not start");
    assert.equal(response.statusCode, 200);

    const body = await new Promise((resolve, reject) => {
        let data = "";

        response.setEncoding("utf8");
        response.on("data", chunk => data += chunk);
        response.on("end", () => resolve(data));
        response.on("error", reject);
    });

    assert.deepEqual(JSON.parse(body), {
        status: "ok",
        service: "CloudShip"
    });
});
