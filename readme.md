### Node & C++

- Node is an interface between javascript and c++
- process.binding connects javascript to c++ (most importantly, libuv and v8 modules)
  - v8: interprete and execute javascript
  - libuv: access filesystem, deal with concurrency
- in the [node](https://github.com/nodejs/node) repo, `lib` contains javascript code, `src` contains c++

### Event Loop

- **thread**: a todo list to be executed by CPU
  - node is single-threaded (event loop uses single thread)
  - many low-level functions are not run in event loop and are not single-threaded
- **thread pool**
  - `libuv` makes use of a thread pool which contains 4 threads, which offloads computationally expense computations (taken out of the event loop), e.g. `pbkdf2`, `fs` module functions
  - can write custom javascript to customize threadpool
  - tasks running in thread pool are considered "pending operations" in the event loop
  - os async functions are considered "pending os tasks" in the event loop
- **pocess**: contains >= 1 thread, OS _scheduler_ will prioritize processes
- **core**: one core can process >= 1 threads at a time (aka multi-threading)
- to increase efficiency:
  - add CPU cores
  - multi-threading
  - event loop: interweaves threads into one thread
- **tick**: one iteration of "body" of the event loop
  1. check pending timer, execute callback if time's up
  2. check pending OS task and operations, threadpool tasks, execute callback if completed (99% of our code)
  3. pause execution, continue if a) a timer copletes, or b) an operation is done or c) an OS task is done
  4. only look at pending timer, call any `setImmediate`
  5. handle any on-close callbacks
- **exit**: when event loop "while" condition evaluates to false, exit back to terminal
  - any funciton registered with `setTimeout`, `setInterval` or `setImmediate` that have not been executed
  - any pending operating system task, e.g. HTTP server listening on a port for incoming requests
  - any long-running operation still being executed, e.g. fs module reading huge file
