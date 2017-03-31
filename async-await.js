const Timer = require('./timer');

/**
 * @param {Number} time (ms)
 * @param {*} result
 */
function getDetainedAction(time, result) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(result);
        }, time);
    });
}

async function go() {
    const t = new Timer('async/await');

    let result = await getDetainedAction(1000, 1);
    t.tick(result);

    result += await 2;
    t.tick(result);

    result += 3;
    t.tick(result);

    result += await getDetainedAction(2000, 4);
    t.tick(result);

    result += await (async () => new Promise((resolve) => {
        setTimeout(() => { resolve(5); }, 1000);
    }))();
    t.tick(result);

    try {
        result += await (async () => new Promise((resolve, reject) => {
            setTimeout(reject, 1000);
        }))();
        console.log('I should never appear');
    } catch (e) {
        console.warn('Error intercepted', e);
        result += 6;
    }
    t.stop(result);

    return result;
}

const tSync = new Timer('sync flow');
const tRealtime = new Timer('realtime flow');

const result = go()
    .then((res) => {
        tRealtime.stop(res);
    })
    .catch(console.error);

tSync.stop(result);
