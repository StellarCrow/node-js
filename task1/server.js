const http = require("http");
const fs = require("fs");
const url = require("url");
const PORT = 3000;

http
  .createServer((req, res) => {
    const path = "info.json";
    const queryObject = url.parse(req.url, true).query;
    const requestInfo = {
      method: req.method,
      url: req.url,
      time: new Date()
    };

    if (fs.existsSync(path)) {
      writeToJson(path, requestInfo);
    } else {
      createNewFile(path, requestInfo);
    }

    res.writeHead(200, { "Content-Type": "application/json" });

    if (req.url === "/get-all-logs" && req.method === "GET") {
      return res.end(JSON.stringify(readFromFile(path)));
    }

    let urlHasQuery = (Object.keys(queryObject).length === 0) ? false : true;
    if (urlHasQuery) {
      const from = queryObject.from;
      const to = queryObject.to;
      let array = getDataRanged(path, from, to);
      return res.end(JSON.stringify(array));
    }

    res.end(JSON.stringify({ status: "ok" }));
  })
  .listen(PORT);

function writeToJson(path, requestInfo) {
  let data = readFromFile(path);
  data.logs.push(requestInfo);

  let writeData = JSON.stringify(data);
  fs.writeFileSync(path, writeData, "utf8");
}

function createNewFile(path, requestInfo) {
  let data = {
    logs: []
  };
  data.logs.push(requestInfo);
  let json = JSON.stringify(data);
  fs.writeFile(path, json, "utf-8", err => {
    if (err) console.log(err);
    else console.log("Created a file!");
  });
}

function readFromFile(path) {
  let data = fs.readFileSync(path, err => {
    if (err) throw err;
  });
  return JSON.parse(data);
}

function getDataRanged(path, from, to) {
  let data = readFromFile(path);
  return data.logs.filter(elem => {
    let date = elem.time.toString().split("T")[0];
    if (date >= from && date <= to) return elem;
  });
}