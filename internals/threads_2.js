/**
 * now the treads are completed in groups of 2 threads at a time
 *
 * console output:
 * 2: 447
 * 1: 454
 * 4: 904
 * 3: 904
 * 5: 1346
 */
process.env.UV_THREADPOOL_SIZE = 2;

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
