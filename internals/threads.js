const { pbkdf2 } = require("crypto");

const start = Date.now();

/**
 * Once the file is opened, both functions are started at the
 * same time, but one does not wait for the other to finish.
 * THE TWO CALLS FINISH AT AROUND THE SAME TIME.
 *
 * The fifth call takes twice as long, because thread pool
 * only handles four threads
 *
 * console output:
 * 2: 454
 * 1: 461
 * 4: 462
 * 3: 462
 * 5: 915
 */
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
