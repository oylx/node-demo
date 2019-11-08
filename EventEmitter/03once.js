/**
 * n个once，1次emit，once的cb执行多次，但是fsReadFile只执行1次
 * 控制台运行以上代码进行测试，虽然发起了多次文件查询请求，fs 模块真正只执行了1次，查询了 a文件，对于相同的请求，通过利用事件监听器 once 的特性避免了相同条件重复查询。
 * 
 * 1个once，多次emit，once多cb只执行1次
 */
const events = require('events');
const emitter = new events.EventEmitter();
const fs = require('fs');
const status = {};

const select = function(i,file, filename, cb) {
    emitter.once(file, cb);

    if (status[file] === undefined) {
        status[file] = 'ready'; // 不存在设置默认值
    }
    if (status[file] === 'ready') {
        status[file] = 'pending';
        fs.readFile(file, function(err, result) {
            if(err) throw err;
            console.log(filename);
            emitter.emit(file, err, result.toString());
            status[file] = 'ready';

            setTimeout(function() {
                delete status[file];
            }, 1000);
        });
    }
}

for (let i=1; i<=3; i++) {
    select(i,`/tmp/a.json`, 'a 文件', function(err, result) {
        console.log('err: ', err, 'result: ', result);
    });
}