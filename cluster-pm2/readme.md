## PM2

- with pm2, we don't need to do the cluster management manually (require cluster module, call fork etc)
- usually ssh into remote server and run pm2 cli
- not often used in development env

```bash
npm install -g pm2

# pass in zero instance, telling pm2 to setup # of instance to logical cores
pm2 start server.js -i 0

# get some info
pm2 show server

# monitor processes, CPU usage etc
pm2 monit

# shut down cluster
pm2 delete server
```
