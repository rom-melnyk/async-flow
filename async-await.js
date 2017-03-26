const Timer = require('./timer');

/**
 * @param {Number} time (ms)
 */
function getDetainedAction(time, result) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(result);
        }, time);
    });
}

async function getAsyncDetainedAction(time, result) {
    return await getDetainedAction(time, result);
}

let result;

const t = new Timer('async/await');

result = getAsyncDetainedAction(1000, 1);

t.tick(result);

result += 2;

t.tick(result);

result += getDetainedAction(2000, 3);

t.tick(result);
