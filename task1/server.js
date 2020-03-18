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
    }
    catch(err) {
      console.error(err);
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });

    if (req.url === "/get-all-logs" && req.method === "GET") {
      return res.end(JSON.stringify(await readFromFile(path)));
    }

    let urlHasQuery = !(Object.keys(queryObject).length === 0);
    if (urlHasQuery) {
      const from = queryObject.from;
      const to = queryObject.to;
      let array = await getDataRanged(path, from, to);
      return res.end(JSON.stringify(array));
    }

    res.end(JSON.stringify({ status: "ok" }));
  })
  .listen(PORT);

async function writeToJson(path, requestInfo) {
  let data = await readFromFile(path);
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
    let data = await readFile(path);
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

async function getDataRanged(path, from, to) {
  let data = await readFromFile(path);
  return data.logs.filter(elem => {
    let date = elem.time.toString().split("T")[0];
    if (date >= from && date <= to) return elem;
  });
}
