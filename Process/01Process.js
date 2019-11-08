
/**
 * 进程
 * 进程（Process）是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位，是操作系统结构的基础，
 * 进程是线程的容器（来自百科）。
 * 我们启动一个服务、运行一个实例，就是开一个服务进程，例如 Java 里的 JVM 本身就是一个进程，
 * Node.js 里通过 node app.js 开启一个服务进程，
 * 多进程就是进程的复制（fork），
 * fork 出来的每个进程都拥有自己的独立空间地址、数据栈，
 * 一个进程无法访问另外一个进程里定义的变量、数据结构，只有建立了 IPC 通信，进程之间才可数据共享。
 */
const http = require('http');

http.createServer().listen(3000, () => {
  process.title = '测试进程 Node.js' // 进程进行命名
  console.log(`process.pid: `, process.pid); // process.pid: 56374
});










