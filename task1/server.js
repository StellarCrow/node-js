const http = require("http");
const fs = require("fs");
const util = require("util");
const url = require("url");
const PORT = 3000;

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

http
  .createServer(async (req, res) => {
    const path = "info.json";
    const queryObject = url.parse(req.url, true).query;
    const requestInfo = {
      method: req.method,
      url: req.url,
      time: new Date()
    };

    try {
      await writeToJson(path, requestInfo);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "server error" }));
      throw err;
    }

    res.writeHead(200, { "Content-Type": "application/json" });

    if (req.url === "/get-all-logs" && req.method === "GET") {
      try {
        const allLogs = JSON.stringify(await readFromFile(path));
        return res.end(allLogs);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "server error" }));
        throw err;
      }
    }

    const urlHasQuery = Object.keys(queryObject).length !== 0;
    if (urlHasQuery) {
      const from = queryObject.from;
      const to = queryObject.to;
      const rangedLogs = await getDataRanged(path, from, to);
      return res.end(JSON.stringify(rangedLogs));
    }

    res.end(JSON.stringify({ status: "ok" }));
  })
  .listen(PORT);

async function writeToJson(path, requestInfo) {
  const data = await readFromFile(path);
  data.logs.push(requestInfo);

  const writeData = JSON.stringify(data);
  try {
    await writeFile(path, writeData, "utf8");
  } catch (err) {
    throw err;
  }
}

async function readFromFile(path) {
  try {
    const data = await readFile(path);
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

async function getDataRanged(path, from, to) {
  const data = await readFromFile(path);
  return data.logs.filter(log => {
    const logDate = log.time.toString().split("T")[0];
    return logDate >= from && logDate <= to;
  });
}
