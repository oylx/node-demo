/**
 * 单线程
 * 单线程就是一个进程只开一个线程，想象一下一个痴情的少年，对一个妹子一心一意用情专一。
 * Javascript 就是属于单线程，程序顺序执行，
 * 可以想象一下队列，前面一个执行完之后，后面才可以执行，
 * 当你在使用单线程语言编码时切勿有过多耗时的同步操作，否则线程会造成阻塞，导致后续响应无法处理。
 * 你如果采用 Javascript 进行编码时候，请尽可能的使用异步操作。
 */

 /**
  * 单线程使用总结
  * Node.js 虽然是单线程模型，但是其基于事件驱动、异步非阻塞模式，
  * 可以应用于高并发场景，避免了程创建、线程之间上下文切换所产生的资源开销。
  * 如果你有需要大量计算，CPU 耗时的操作，开发时候要注意。
  */
// compute.js
const http = require('http');
const [url, port] = ['127.0.0.1', 3000];

const computation = () => {
  let sum = 0;
  console.info('计算开始');
  console.time('计算耗时');

  for (let i = 0; i < 1e10; i++) {
    sum += i
  };

  console.info('计算结束');
  console.timeEnd('计算耗时');
  return sum;
};

const server = http.createServer((req, res) => {
  if(req.url == '/compute'){
    const sum = computation();

    res.end(`Sum is ${sum}`);
  }

  res.end(`ok`);
});

server.listen(port, url, () => {
  console.log(`server started at http://${url}:${port}`);
});
/**
 * 多线程
 * 就是没有一个进程只开一个线程的限制，
 * 好比一个风流少年除了爱慕自己班的某个妹子，还在想着隔壁班的漂亮妹子。
 * Java 就是多线程编程语言的一种，可以有效避免代码阻塞导致的后续请求无法处理。
 * public class TestApplication {
    Integer count = 0;

    @GetMapping("/test")
    public Integer Test() {
      count += 1;
      return count;
    }

    public static void main(String[] args) {
    SpringApplication.run(TestApplication.class, args);
  }
}
 */





