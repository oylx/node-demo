/**
 * 创建Buffer
 * 可以通过 Buffer.from()、Buffer.alloc() 与 Buffer.allocUnsafe() 三种方式来创建
 * 通过使用字符编码，可实现 Buffer 实例与 JavaScript 字符串之间的相互转换，目前所支持的字符编码如下所示：
 */


/**
 * Buffer.from
 * @type {Buffer}
 */
const b1 = Buffer.from('10')
const b2 = Buffer.from('10', 'utf8')
const b3 = Buffer.from([10])
const b4 = Buffer.from(b3)
console.log(b1,b2,b3,b4);

/**
 * Buffer.alloc
 * 返回一个已初始化的 Buffer，可以保证新创建的 Buffer 永远不会包含旧数据。
 * @type {Buffer}
 */
const bAlloc1 = Buffer.alloc(10); // 创建一个大小为 10 个字节的缓冲区

console.log(bAlloc1); // <Buffer 00 00 00 00 00 00 00 00 00 00>

/**
 * Buffer.allocUnsafe
 * 创建一个大小为 size 字节的新的未初始化的 Buffer，
 * 由于 Buffer 是未初始化的，因此分配的内存片段可能包含敏感的旧数据。
 * 在 Buffer 内容可读情况下，则可能会泄露它的旧数据，这个是不安全的，使用时要谨慎。
 **/
const bAllocUnsafe1 = Buffer.allocUnsafe(10);

console.log(bAllocUnsafe1); // <Buffer 49 ae c9 cd 49 1d 00 00 11 4f>

