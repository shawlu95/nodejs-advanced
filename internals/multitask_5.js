/**
 * FS read now finishes first
 * FS: 19
 * http request 311
 * Hash: 512
 * Hash: 512
 * Hash: 513
 * Hash: 515
 */
process.env.UV_THREADPOOL_SIZE = 5;

const https = require("https");
const { pbkdf2 } = require("crypto");
const fs = require("fs");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("http request", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  pbkdf2("a", "b", 100000, 512, "sha512", () =>
    console.log("Hash:", Date.now() - start)
  );
}

doRequest();

fs.readFile("multitask.js", "utf8", () => {
  console.log("FS:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();