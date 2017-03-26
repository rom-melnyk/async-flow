function getHeader(name) {
    let header = 'Timer';
    if (name) {
        header += ` "${name}"`
    }
    return header;
}

function getResult(value) {
    let result = '';
    if (value !== undefined) {
        result += ` with the result "${value}"`;
    }
    return result;
}

/**
 * Simple time logging
 */
class Timer {
    /**
     * @param {String} [name]
     * @param {Boolean} [autoStart=true]
     */
    constructor(name, autoStart = true) {
        this.timestamp = Date.now();
        this.name = name || null;
        if (autoStart) {
            this.start();
        }
    }

    start() {
        this.timestamp = Date.now();
        console.log(`[ ${getHeader(this.name)} ] Started.`);
    }

    tick(result) {
        const now = Date.now();
        console.log(`[ ${getHeader(this.name)} ] tick in ${now - this.timestamp}ms${getResult(result)}`);
        this.timestamp = now;
    }

    stop(result) {
        const now = Date.now();
        console.log(`[ ${getHeader(this.name)} ] stopped in ${now - this.timestamp}ms${getResult(result)}`);
    }

    reset() {
        this.timestamp = Date.now();
    }
}

module.exports = Timer;
