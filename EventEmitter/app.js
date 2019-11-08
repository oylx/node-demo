const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter()
emitter.on('getUp',(time)=>{
    console.log(`morning ${ time } start to get up,work hard in new day`)
})
emitter.emit('getUp','6:00')