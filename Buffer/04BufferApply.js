/**
 * 加解密
 * 加解密
 * 在一些加解密算法中会遇到使用 Buffer，例如 crypto.createCipheriv 的第二个参数 key 为 String 或 Buffer 类型，如果是 Buffer 类型，就用到了本篇我们讲解的内容，以下做了一个简单的加密示例，重点使用了 Buffer.alloc() 初始化一个实例（这个上面有介绍），之后使用了 fill 方法做了填充，这里重点在看下这个方法的使用。
 * buf.fill(value[, offset[, end]][, encoding])
 * value: 第一个参数为要填充的内容
 * offset: 偏移量，填充的起始位置
 * end: 结束填充 buf 的偏移量
 * encoding: 编码集
 */
const crypto = require('crypto');
const [key, iv, algorithm, encoding, cipherEncoding] = [
  'a123456789', '', 'aes-128-ecb', 'utf8', 'base64'
];

const handleKey = key => {
  const bytes = Buffer.alloc(16); // 初始化一个 Buffer 实例，每一项都用 00 填充
  console.log(bytes); // <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
  bytes.fill(key, 0, 10) // 填充
  console.log(bytes); // <Buffer 61 31 32 33 34 35 36 37 38 39 00 00 00 00 00 00>

  return bytes;
}

let cipher = crypto.createCipheriv(algorithm, handleKey(key), iv);
let crypted = cipher.update('Node.js 技术栈', encoding, cipherEncoding);
crypted += cipher.final(cipherEncoding);

console.log(crypted) // jE0ODwuKN6iaKFKqd3RF4xFZkOpasy8WfIDl8tRC5t0=

/**I/O 操作
 * 关于 I/O 可以是文件或网络 I/O，以下为通过流的方式将 input.txt 的信息读取出来之后写入到 output.txt 文件
 */
const fs = require('fs');

const inputStream = fs.createReadStream('input.txt'); // 创建可读流
const outputStream = fs.createWriteStream('output.txt'); // 创建可写流

inputStream.pipe(outputStream); // 管道读写