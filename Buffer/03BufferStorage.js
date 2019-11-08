/**
 * Buffer内存机制
 * Node.js 的垃圾回收中主要使用 V8 来管理，但是并没有提到 Buffer 类型的数据是如何回收的
 * Buffer 的内存回收机制
 * Buffer 需要处理的是大量的二进制数据，假如用一点就向系统去申请，
 * 则会造成频繁的向系统申请内存调用，所以 Buffer 所占用的内存不再由 V8 分配，
 * 而是在 Node.js 的 C++ 层面完成申请，在 JavaScript 中进行内存分配。
 * 因此，这部分内存我们称之为堆外内存。
 * 注意：以下使用到的 buffer.js 源码为 Node.js v10.x 版本，地址：https://github.com/nodejs/node/blob/v10.x/lib/buffer.js
 */

/**
 * Node.js 采用了 slab 机制进行预先申请、事后分配，是一种动态的管理机制。
 * 使用 Buffer.alloc(size) 传入一个指定的 size 就会申请一块固定大小的内存区域，slab 具有如下三种状态：
 * full：完全分配状态
 * partial：部分分配状态empty：没有被分配状态8KB 限制
 * Node.js 以 8KB 为界限来区分是小对象还是大对象，在 buffer.js 中可以看到以下代码
 * Buffer.poolSize = 8 * 1024;
 */

/**
 * 8KB 限制
 */
Buffer.poolSize = 8 *1024

console.log(Buffer.poolSize)
console.log(Buffer.poolSize >>> 1) //4096
Buffer.poolSize = 8 * 1024;
var poolSize, poolOffset, allocPool;


function createPool() {
  poolSize = Buffer.poolSize;
  allocPool = createUnsafeArrayBuffer(poolSize);
  poolOffset = 0;
}
createPool();

function allocate(size) {
    if (size <= 0) {
      return new FastBuffer();
    }

    // 当分配的空间小于 Buffer.poolSize 向右移位，这里得出来的结果为 4KB
    if (size < (Buffer.poolSize >>> 1)) {
      if (size > (poolSize - poolOffset))
        createPool();
      var b = new FastBuffer(allocPool, poolOffset, size);
      poolOffset += size; // 已使用空间累加
      alignPool(); // 8 字节内存对齐处理
      return b;
    } else { // C++ 层面申请
      return createUnsafeBuffer(size);
    }
  }


/**
 * Buffer 内存分配总结，朴灵大佬的「深入浅出 Node.js」Buffer 一节还是讲解的挺详细的
 * 在初次加载时就会初始化 1 个 8KB 的内存空间，buffer.js 源码有体现
 * 根据申请的内存大小分为 小 Buffer 对象 和 大 Buffer 对象
 * 小 Buffer 情况，会继续判断这个 slab 空间是否足够
 * 如果空间足够就去使用剩余空间同时更新 slab 分配状态，偏移量会增加
 * 如果空间不足，slab 空间不足，就会去创建一个新的 slab 空间用来分配
 * 大 Buffer 情况，则会直接走 createUnsafeBuffer(size) 函数
 * 不论是小 Buffer 对象还是大 Buffer 对象，
 * 内存分配是在 C++ 层面完成，内存管理在 JavaScript 层面，最终还是可以被 V8 的垃圾回收标记所回收。
 */
