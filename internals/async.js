/**
 * All request takes approx the same amount of time,
 * same as one single call. libuv delegates http
 * request to os async helper, which decides whether
 * to make a new thread or not. So it's out of control
 * of thread pool
 */
const https = require("https");

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();