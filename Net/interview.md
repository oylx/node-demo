## [TCP 粘包问题](https://www.nodejs.red/#/nodejs/net?id=tcp-粘包问题)

> Interview2: TCP 粘包是什么？该怎么解决？

demo1的例子最后抛出了一个问题，为什么客户端连续向服务端发送数据，会收到合并返回呢？

server输出：

```
你好 Nodejs 技术栈
你好 JavaScript 
你好 TypeScript Python Java C PHP ASP.NET 
```



这也是在 TCP 中常见的粘包问题，**客户端（发送的一端）在发送之前会将短时间有多个发送的数据块缓冲到一起（发送端缓冲区），形成一个大的数据块一并发送**，同样接收端也有一个**接收端缓冲区**，**收到的数据先存放接收端缓冲区，然后程序从这里读取部分数据进行消费**，这样做也是为了减少 I/O 消耗达到性能优化。

> **问题思考：数据到达缓冲区什么时间开始发送？**

这个取决于 **TCP 拥塞控制**，是任何时刻内确定能被发送出去的字节数的控制因素之一，是阻止发送方至接收方之间的链路变得拥塞的手段，参考维基百科：https://zh.wikipedia.org/wiki/TCP拥塞控制

> **TCP 粘包解决方案?**

- 方案一：延迟发送
- 方案二：关闭 Nagle 算法
- 方案三：封包/拆包

### 方案一：延迟发送

一种最简单的方案是设置延迟发送，sleep 休眠一段时间的方式，但是这个方案虽然简单，同时缺点也显而易见，传输效率大大降低，对于交互频繁的场景显然是不适用的，第一次改造如下：

```
client.on('connect', () => {
    client.setNoDelay(true);
    // 向服务器发送数据
    client.write('Nodejs 技术栈');

    const arr = [
        'JavaScript ',
        'TypeScript ',
        'Python ',
        'Java ',
        'C ',
        'PHP ',
        'ASP.NET '
    ]

    for (let i=0; i<arr.length; i++) {
        (function(val, k){
            setTimeout(() => {
                client.write(val);
            }, 1000 * (k+1))
        }(arr[i], i));
    }
})
```

输出：

```
你好 Nodejs 技术栈
你好 JavaScript 
你好 TypeScript 
你好 Python 
你好 Java 
你好 C 
你好 PHP 
你好 ASP.NET 
```

### 方案二：Nagle 算法

Nagle 算法是一种改善网络传输效率的算法，避免网络中充斥着大量小的数据块，它所期望的是尽可能发送大的数据块，因此在每次请求一个数据块给 TCP 发送时，TCP 并不会立即执行发送，而是等待一小段时间进行发送。

当网络中充斥着大量小数据块时，Nagle 算法能将小的数据块集合起来一起发送减少了网络拥堵，这个还是很有帮助的，但也并不是所有场景都需要这样，例如，REPL 终端交互，当用户输入单个字符以获取响应，所以在 Node.js 中可以设置 socket.setNoDelay() 方法来关闭 Nagle 算法。

```js
const server = net.createServer();

server.on('connection', socket => {
    socket.setNoDelay(true);
})
```

关闭 Nagle 算法并不总是有效的，因为其是在服务端完成合并，TCP 接收到数据会先存放于自己的缓冲区中，然后通知应用接收，应用层因为网络或其它的原因若不能及时从 TCP 缓冲区中取出数据，也会造成 TCP 缓冲区中存放多段数据块，就又会形成粘包。

### [方案三：封包/拆包](https://www.nodejs.red/#/nodejs/net?id=方案三：封包拆包)

前面两种方案都不是特别理想的，这里介绍第三种**封包/拆包**，也是目前业界用的比较多的，这里使用长度编码的方式，通信双方约定好格式，**将消息分为定长的消息头（Header）和不定长的消息体（Body）**，在解析时读取消息头获取到内容占用的长度，之后读取到的消息体内容字节数等于字节头的字节数时，我们认为它是一个完整的包。

| 消息头序号 (Header) | 消息体长度 (Header) | 消息体 (Body) |
| ------------------- | ------------------- | ------------- |
| SerialNumber        | bodyLength          | body          |
| 2（字节）           | 2（字节）           | N（字节）     |

#### [预先知识 Buffer](https://www.nodejs.red/#/nodejs/net?id=预先知识-buffer)

下面会通过编码实现，但是在开始之前希望你能了解一下 Buffer，可参考我之前写的 Buffer 文章 [Node.js 中的缓冲区（Buffer）究竟是什么？](https://mp.weixin.qq.com/s/UU-Gug_Dx-OmXVL-99rWRg)，下面我列出本次需要用到的 Buffer 做下说明，对于不了解 Buffer 的同学是有帮助的。

- **Buffer.alloc(size[, fill[, encoding]])**：初始化一个 size 大小的 Buffer 空间，默认填充 0，也可以指定 fill 进行自定义填充
- **buf.writeInt16BE(value[, offset])**：value 为要写入的 Buffer 值，offset 为偏移量从哪个位置开始写入
- **buf.writeInt32BE(value[, offset])**：参数同 writeInt16BE，不同的是 writeInt16BE 表示高位优先写入一个 16 位整型，而 writeInt32BE 表示高位优先写入一个 32 位整型
- **buf.readInt16BE([offset])**：高位优先读取 16 位整型，offset 为读取之前要跳过的字节数
- **buf.readInt32BE([offset])**：高位优先读取 32 位整型，offset 为读取之前要跳过的字节数