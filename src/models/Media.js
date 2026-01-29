class Media {
    constructor(title) {
        this._title = title;
        this._isCheckedOut = false;
        this._ratings = [];
    }
    get title() {
        return this._title;
    }
    get isCheckedOut() {
        return this._isCheckedOut;
    }
    get ratings() {
        return this._ratings;
    }
    getAverageRating() {
        let ratingsSumTotal = 0;
        for (let i = 0; i < this._ratings.length; i += 1) {
            ratingsSumTotal += this._ratings[i];
        }
        const averageCalc = (ratingsSumTotal / this.ratings.length).toFixed(1);
        return averageCalc;
    }
    toggleCheckedOutStatus() {
        this._isCheckedOut = !this._isCheckedOut;
    }
    addRating(newRating) {
        this._ratings.push(newRating);
    }

}

module.exports = Media;