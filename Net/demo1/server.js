/**
 * TCP 服务器事件
 * listening: 也就是 server.listen();
 * connection: 新链接建立时触发，也就是每次收到客户端回调，参数 socket 为 net.createServer 实例，也可以写在 net.createServer(function(socket) {}) 方法里
 * close：当 server 关闭的时候触发（server.close()）。 如果有连接存在，直到所有的连接结束才会触发这个事件
 * error：捕获错误，例如监听一个已经存在的端口就会报 Error: listen EADDRINUSE 错误
 */

/**
 * TCP 链接事件方法
 * data: 一端调用 write() 方法发送数据时，另一端会通过 socket.on('data') 事件接收到，可以理解为读取数据
 * end: 每次 socket 链接会出现一次，例如客户端发送消息之后执行 Ctrl + C 终端，就会收到
 * error: 监听 socket 的错误信息
 * write：write 是一个方法（socket.write()）上面的 data 事件是读数据，write 方法在这里就为写数据到另一端，
 */
const net = require('net');
const HOST = '127.0.0.1';
const PORT = 3000;

// 创建一个 TCP 服务实例
const server = net.createServer();

// 监听端口
server.listen(PORT, HOST);

server.on('listening', () => {
  console.log(`服务已开启在 ${HOST}:${PORT}`);
});

server.on('connection', socket => {
  // data 事件就是读取数据
  socket.on('data', buffer => {
    const msg = buffer.toString();
    console.log(msg);

    // write 方法写入数据，发回给客户端
    socket.write(Buffer.from('你好 ' + msg));
  });
})

server.on('close', () => {
  console.log('Server Close!');
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.log('地址正被使用，重试中...');

    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  } else {
    console.error('服务器异常：', err);
  }
});
