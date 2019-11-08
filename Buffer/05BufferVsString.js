/**
 * 在 HTTP 传输中传输的是二进制数据，例子中的 /string 接口直接返回的字符串，这时候 HTTP 在传输之前会先将字符串转换为 Buffer 类型，以二进制数据传输，通过流（Stream）的方式一点点返回到客户端。
 * 但是直接返回 Buffer 类型，则少了每次的转换操作，对于性能也是有提升的。
 *  在一些 Web 应用中，对于静态数据可以预先转为 Buffer 进行传输，可以有效减少 CPU 的重复使用（重复的字符串转 Buffer 操作）
 * $ ab -c 200 -t 60 http://192.168.6.131:3000/buffer
 * $ ab -c 200 -t 60 http://192.168.6.131:3000/string
 */
const http = require('http');
let s = '';
for (let i=0; i<1024*10; i++) {
    s+='a'
}

const str = s;
const bufStr = Buffer.from(s);
const server = http.createServer((req, res) => {
    console.log(req.url);

    if (req.url === '/buffer') {
        res.end(bufStr);
    } else if (req.url === '/string') {
        res.end(str);
    }
});

server.listen(3000);
