/**
 * https request always finish first, fs call appears after at
 * least one hash call.
 * 
 * https completely skips the threadpool and returns content to
 * event loop as soon as it completes
 * 
 * readFile consists of: 
 * 1) node gets some stats of the file
 * 2) hard drive accessed, stats returned (one round trip to hard drive)
 * 3) node requests to read the file
 * 4) hard drive accessed, content streamed back to app (second round trip)
 * 5) node returns content to us
 * 
 * 1 fs read and 4 hashes are sent to thread pool. After the thread reaches
 * out to hard drive, the fourh hash is registered. All threads are working
 * on hashes.
 * 
 * when another thread finishes hash, it takes on the second phase of fs read
 * and requests to read the file from hard drive
 */
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