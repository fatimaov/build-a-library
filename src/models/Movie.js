const Media = require('./Media');

class Movie extends Media {
    constructor(title, director, runtime) {
        super(title);
        this._director = director;
        this._runtime = runtime;
    }
    get director() {
        return this._director;
    }
    get runtime() {
        return `${this._runtime}min`
    }
}

module.exports = Movie;