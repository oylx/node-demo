const EventEmitter = require('events');
const oneDayPlanRun = {
    "6:00": function() {
        console.log(`现在是早上 6:00，起床，开始新的一天加油！`);
    },
    "7:00": function() {
        console.log(`现在是早上 7:00，吃早饭！`);
    }
}

function OneDayPlan() {
    EventEmitter.call(this);
}

Object.setPrototypeOf(OneDayPlan.prototype, EventEmitter.prototype);
Object.setPrototypeOf(OneDayPlan, EventEmitter);

const oneDayPlan = new OneDayPlan();

oneDayPlan.on("6:00", function() {
    oneDayPlanRun["6:00"]();
});

oneDayPlan.on("7:00", function() {
    oneDayPlanRun["7:00"]();
});

let a;
async function doMain() {
    oneDayPlan.emit("6:00");

    const a = await sleep(2000); // 间隔 2 秒钟输出

    oneDayPlan.emit("7:00");
}

doMain();

async function sleep(s) {
    const b = new Promise(function(reslve) {
        setTimeout(function() {
            reslve(1);
        }, s);
    });
    return b
}
