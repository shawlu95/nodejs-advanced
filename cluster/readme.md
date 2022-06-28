## Clustering Mode

- nodemon doesn't work well with cluster mdoe, don't use it here
- first run executing [server.js](./server.js) will generate a cluster manager which import `cluster` module
- when cluster manager calls `cluster.fork`, a new instance of [server.js](./server.js) is created
