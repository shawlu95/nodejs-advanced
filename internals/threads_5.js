/**
 * 5 threads are completed at the same time because
 * scheduler can juggle works across CPU so each
 * thread costs approx same amount of CPU time
 *
 * console output:
 * 3: 472
 * 2: 479
 * 1: 479
 * 5: 479
 * 4: 480
 */
process.env.UV_THREADPOOL_SIZE = 5;

const { pbkdf2 } = require("crypto");

const start = Date.now();

pbkdf2("a", "b", 100000, 512, "sha512", () =>
  console.log("1:", Date.now() - start)
);
pbkdf2("a", "b", 100000, 512, "sha512", () =>
  console.log("2:", Date.now() - start)
);
pbkdf2("a", "b", 100000, 512, "sha512", () =>
  console.log("3:", Date.now() - start)
);
pbkdf2("a", "b", 100000, 512, "sha512", () =>
  console.log("4:", Date.now() - start)
);
pbkdf2("a", "b", 100000, 512, "sha512", () =>
  console.log("5:", Date.now() - start)
);
