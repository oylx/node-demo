const Koa = require('koa');
const app = new Koa();
app.on('Koa',()=>{
    console.log('use EventEmitter')
})
app.emit('Koa')