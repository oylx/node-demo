/**
 * Node.js 采用了 slab 机制进行预先申请、事后分配，是一种动态的管理机制。
 * 使用 Buffer.alloc(size) 传入一个指定的 size 就会申请一块固定大小的内存区域，slab 具有如下三种状态：
 * full：完全分配状态
 * partial：部分分配状态empty：没有被分配状态8KB 限制
 * Node.js 以 8KB 为界限来区分是小对象还是大对象，在 buffer.js 中可以看到以下代码
 * Buffer.poolSize = 8 * 1024;
 */
