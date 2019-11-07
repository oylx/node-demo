const { EventEmitter }  = require('events')

const proxy = new EventEmitter();
proxy.once('x',()=>{
    console.log('once:1')
})
proxy.once('x',()=>{
    console.log('once:2')
})
proxy.once('x',()=>{
    console.log('once:3')
})
proxy.on('x',()=>{
    console.log('on:11')
})
proxy.on('x',()=>{
    console.log('on:22')
})
proxy.on('x',()=>{
    console.log('on:33')
})

proxy.emit('x')
proxy.emit('x')
proxy.emit('x')