## Clustering Mode

- nodemon doesn't work well with cluster mdoe, don't use it here
- first run executing [server.js](./server.js) will generate a cluster manager which import `cluster` module
- when cluster manager calls `cluster.fork`, a new instance of [server.js](./server.js) is created

## Benchmark

we use Apache Benchmark (executable `ab`) to measure performance

```bash
# try to make 50 requests concurrently (batches of 50)
# make 500 requests in total
ab -c 50 -n 500 localhost:8080/fast

Server Software:
Server Hostname:        localhost
Server Port:            8080

Document Path:          /fast
Document Length:        46 bytes

Concurrency Level:      50
Time taken for tests:   0.092 seconds
Complete requests:      500
Failed requests:        0
Total transferred:      123000 bytes
HTML transferred:       23000 bytes
Requests per second:    5435.73 [#/sec] (mean)
Time per request:       9.198 [ms] (mean)
Time per request:       0.184 [ms] (mean, across all concurrent requests)
Transfer rate:          1305.85 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.4      0       2
Processing:     2    8   1.1      7      12
Waiting:        1    7   1.2      7      11
Total:          4    8   1.1      8      13

Percentage of the requests served within a certain time (ms)
  50%      8
  66%      8
  75%      8
  80%      9
  90%      9
  95%     10
  98%     11
  99%     12
 100%     13 (longest request)
```

Baseline

```bash
ab -c 1 -n 1 localhost:8080/

Concurrency Level:      1
Time taken for tests:   0.457 seconds
Complete requests:      1
Failed requests:        0
Total transferred:      200 bytes
HTML transferred:       2 bytes
Requests per second:    2.19 [#/sec] (mean)
Time per request:       457.268 [ms] (mean)
Time per request:       457.268 [ms] (mean, across all concurrent requests)
Transfer rate:          0.43 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:   457  457   0.0    457     457
Waiting:      457  457   0.0    457     457
Total:        457  457   0.0    457     457
```

Make two requests togeher (one worker)

```bash
Concurrency Level:      2
Time taken for tests:   1.012 seconds
Complete requests:      2
Failed requests:        0
Total transferred:      400 bytes
HTML transferred:       4 bytes
Requests per second:    1.98 [#/sec] (mean)
Time per request:       1011.685 [ms] (mean)
Time per request:       505.842 [ms] (mean, across all concurrent requests)
Transfer rate:          0.39 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:   497  506  13.0    515     515
Waiting:      497  506  12.4    514     514
Total:        497  506  13.0    516     516

Percentage of the requests served within a certain time (ms)
  50%    516
  66%    516
  75%    516
  80%    516
  90%    516
  95%    516
  98%    516
  99%    516
 100%    516 (longest request)
```

Make two requests togeher (two worker)

```bash
ab -c 2 -n 2 localhost:8080/

Concurrency Level:      2
Time taken for tests:   0.887 seconds
Complete requests:      2
Failed requests:        0
Total transferred:      400 bytes
HTML transferred:       4 bytes
Requests per second:    2.26 [#/sec] (mean)
Time per request:       886.784 [ms] (mean)
Time per request:       443.392 [ms] (mean, across all concurrent requests)
Transfer rate:          0.44 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       0
Processing:   443  444   0.7    444     444
Waiting:      443  443   0.2    443     443
Total:        444  444   0.6    444     444

Percentage of the requests served within a certain time (ms)
  50%    444
  66%    444
  75%    444
  80%    444
  90%    444
  95%    444
  98%    444
  99%    444
 100%    444 (longest request)
```

Make 8 requests together (8 workers)

```bash
shaw.lu$ ab -c 8 -n 8 localhost:8080/

Concurrency Level:      8
Time taken for tests:   0.968 seconds
Complete requests:      8
Failed requests:        0
Total transferred:      1600 bytes
HTML transferred:       16 bytes
Requests per second:    8.26 [#/sec] (mean)
Time per request:       968.065 [ms] (mean)
Time per request:       121.008 [ms] (mean, across all concurrent requests)
Transfer rate:          1.61 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.1      0       1
Processing:   465  495  12.7    500     504
Waiting:      463  495  12.9    499     503
Total:        465  496  12.7    500     505

Percentage of the requests served within a certain time (ms)
  50%    500
  66%    500
  75%    501
  80%    501
  90%    505
  95%    505
  98%    505
  99%    505
 100%    505 (longest request)
```
