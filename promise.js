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

const t = new Timer('promise');

getDetainedAction(1000, 'one')
    .then((res) => {
        t.tick(res);
        return 'two';
    })
    .then((res) => {
        t.tick(res);
        return 'three';
    })
    .then((res) => {
        t.tick(res);
        return getDetainedAction(3000, 'four');
    })
    .then((res) => {
        t.tick(res);
        return 'five';
    })
    .then((res) => {
        t.tick(res);
        return I.dont.exist;
    })
    .then((res) => {
        console.log('I should never appear');
    })
    .catch((e) => {
        console.error('Error intercepted:', e);
        return 'six';
    })
    .then((res) => {
        t.stop(res);
    })
    .catch(console.error);
