/** setImmediate() 或 process.nextTick() 切换到异步模式 */
const { EventEmitter } = require('events');
const emitter = new EventEmitter()
emitter.on('test',()=>{

  process.nextTick(()=>{
    console.log('111')
  })
})
emitter.emit('test')
console.log(222)
