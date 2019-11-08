/**
 * Node.js 是 Javascript 在服务端的运行环境，构建在 chrome 的 V8 引擎之上，
 * 基于事件驱动、非阻塞I/O模型，充分利用操作系统提供的异步 I/O 进行多任务的执行，
 * 适合于 I/O 密集型的应用场景，
 * 因为异步，程序无需阻塞等待结果返回，而是基于回调通知的机制，
 * 原本同步模式等待的时间，则可以用来处理其它任务，
 * 在 Web 服务器方面，著名的 Nginx 也是采用此模式（事件驱动），
 * Nginx 采用 C 语言进行编写，主要用来做高性能的 Web 服务器，不适合做业务。
 * Web业务开发中，如果你有高并发应用场景那么 Node.js 会是你不错的选择。
 *
 * 在单核 CPU 系统之上我们采用 单进程 + 单线程 的模式来开发。
 * 在多核 CPU 系统之上，可以用过 child_process.fork 开启多个进程
 * （Node.js 在 v0.8 版本之后新增了Cluster 来实现多进程架构） ，即 多进程 + 单线程 模式。
 * 注意：
 * 开启多进程不是为了解决高并发，主要是解决了单进程模式下 Node.js CPU 利用率不足的情况，充分利用多核 CPU 的性能。
 */


/**
 * Node.js 中的进程 Process 是一个全局对象，无需 require 直接使用，
 * 给我们提供了当前进程中的相关信息。官方文档提供了详细的说明，感兴趣的可以亲自实践下 Process 文档。
 * process.env：环境变量，例如通过 process.env.NODE_ENV 获取不同环境项目配置信息
 *  process.nextTick：这个在谈及 Event Loop 时经常为会提到
 * process.pid：获取当前进程id
 * process.ppid：当前进程对应的父进程
 * process.cwd()：获取当前进程工作目录
 * process.platform：获取当前进程运行的操作系统平台
 * process.uptime()：当前进程已运行时间，例如：pm2 守护进程的 uptime 值
 * 进程事件：
 * process.on('uncaughtException', cb) 捕获异常信息
 * process.on('exit', cb）进程推出监听
 * 三个标准流：
 * process.stdout 标准输出
 * process.stdin 标准输入
 * process.stderr 标准错误输出
 *
 * 除了 Process 之外 Node.js 还提供了 child_process 模块用来对子进程进行操作
 * child_process.spawn()：适用于返回大量数据，例如图像处理，二进制数据处理。
 * child_process.exec()：适用于小量数据，maxBuffer 默认值为 200 * 1024 超出这个默认值将会导致程序崩溃，数据量过大可采用 spawn。
 * child_process.execFile()：类似 child_process.exec()，区别是不能通过 shell 来执行，不支持像 I/O 重定向和文件查找这样的行为
 * child_process.fork()： 衍生新的进程，进程之间是相互独立的，每个进程都有自己的 V8 实例、内存，系统资源是有限的，不建议衍生太多的子进程出来，通长根据系统 CPU 核心数设置。
 */
const spawn = require('child_process').spawn;
const child = spawn('ls', ['-l'], { cwd: '/usr' }) // cwd 指定子进程的工作目录，默认当前目录

child.stdout.pipe(process.stdout);
console.log(process.pid, child.pid); // 主进程id3243 子进程3244


/**
 * Javascript 是单线程，但是做为宿主环境的 Node.js 并非是单线程的。
 * 由于单线程原故，一些复杂的、消耗 CPU 资源的任务建议不要交给 Node.js 来处理，
 * 当你的业务需要一些大量计算、视频编码解码等 CPU 密集型的任务，可以采用 C 语言。
 * Node.js 和 Nginx 均采用事件驱动方式，避免了多线程的线程创建、线程上下文切换的开销。
 * 如果你的业务大多是基于 I/O 操作，那么你可以选择 Node.js 来开发。
 */



