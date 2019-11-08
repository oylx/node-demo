
/**
 * Buffer 字符编码
 * 'ascii' - 仅适用于 7 位 ASCII 数据。此编码速度很快，如果设置则会剥离高位。
 * 'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8。
 * 'utf16le' - 2 或 4 个字节，小端序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
 * 'ucs2' - 'utf16le' 的别名。
 * 'base64' - Base64 编码。当从字符串创建 Buffer 时，此编码也会正确地接受 RFC 4648 第 5 节中指定的 “URL 和文件名安全字母”。
 * 'latin1' - 一种将 Buffer 编码成单字节编码字符串的方法（由 RFC 1345 中的 IANA 定义，第 63 页，作为 Latin-1 的补充块和 C0/C1 控制码）。
 * 'binary' - 'latin1' 的别名。
 * 'hex' - 将每个字节编码成两个十六进制的字符。
 * @type {Buffer}
 */

 /**
  * UTF-8编码
  * 一个英文字符等于一个字节
  * 一个中文（含繁体）等于三个字节。
  */
const buf1 = Buffer.from('hello world', 'ascii');
console.log(buf1.toString('hex')); // 68656c6c6f20776f726c64

const buf = Buffer.from('Node.js 技术栈', 'UTF-8');
console.dir(buf); // <Buffer 4e 6f 64 65 2e 6a 73 20 e6 8a 80 e6 9c af e6 a0 88> [32,78,111,100]
console.log(buf.length); // 17
console.log(buf.toString('UTF-8', 0,1)); // Node.js 技
