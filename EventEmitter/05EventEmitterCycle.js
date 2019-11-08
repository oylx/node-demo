const { EventEmitter } = require('events')
const emitter = new EventEmitter()
const test = ()=>{console.log('test')}

/** 陷入死循环 */
emitter.on('test',()=>{
    test();
    emitter.emit('test')
})

emitter.emit('test')

/** 正常 */
emitter.on('test', function() {
    test();
    emitter.on('test', test);
})

emitter.emit('test');
