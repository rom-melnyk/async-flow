const Timer = require('./timer');

/**
 * @param {Iterator} iter
 * @param {Number} time (ms)
 * @param {*} result
 * @param {Boolean} throwError
 */
function getDetainedAction(iter, time, result, throwError = false) {
    setTimeout(() => {
        if (throwError) {
            iter.throw('Error in async function');
        } else {
            iter.next(result);
        }
    }, time);
}


function* generator() {
    let i = '';
    t.tick(`generator started`);

    i += yield getDetainedAction(iter, 1000, 'one');
    t.tick(i);

    i += yield getDetainedAction(iter, 2000, ' two');
    t.tick(i);

    // Sync flow is kinda clumsy.
    // Actually it must be async because we cannot call `iter.next()` when Generator is running.
    setTimeout(() => { iter.next(' three'); }, 0);
    i += yield;
    t.tick(i);

    try {
        i += yield getDetainedAction(iter, 1000, 'I should never appear', true);
    } catch (e) {
        console.warn(`Error intercepted:`, e);

        setTimeout(() => { iter.next(' four'); }, 0);
        i += yield;
        t.tick(i);
    }

    t.stop(i);
}


const t = new Timer('generator');
const iter = gen();;
iter.next(); // Here we go
t.tick('first .next()');
