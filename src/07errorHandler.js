/**
 * 最后一个最重要的错误处理，
 * 在 Node.js 中错误处理是一个需要重视的事情，一旦抛出一个错误没有人为处理，
 * 可能造成的结果是进程自动退出，
 * 如下代码因为事件触发器带有错误信息并且被监听到，所以console.log(test)得到执行。
 */
const { EventEmitter } = require('events');
const emitter = new EventEmitter();

emitter.on('error',(err)=>{
  console.log(err);
})
emitter.emit('error', new Error('This is a error'));
console.log('test');

