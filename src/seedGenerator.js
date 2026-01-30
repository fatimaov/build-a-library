const Book = require('./models/Book');
const Movie = require('./models/Movie');
const Cd = require('./models/CD');
// Static data 
const {mediaTypeClasses, staticMediaData} = require('./staticData');

function mediaSeed(mediaTypeClasses, staticMediaData) {
    const mediaDataArr = Object.values(staticMediaData);
    const mediaTypeData = []
    const filledIndex = []

    for (const i in mediaDataArr) {
        if (mediaDataArr[i].length !== 0) {
            filledIndex.push(i)
        }
    }

    let currentValue = undefined;
    for (let i = 0; i < filledIndex.length; i += 1) {
        currentValue = filledIndex[i];
        mediaTypeData.push([]);
        for (let j = 0; j < (mediaDataArr[currentValue].length); j += 1) {
            mediaTypeData[i].push(new mediaTypeClasses[currentValue]((mediaDataArr[currentValue])[j].title, (mediaDataArr[currentValue])[j].creator, (mediaDataArr[currentValue])[j].pagesRuntimeSongs))
        }
    }

    // // Add random ratings to each seeded item
    for (let k = 0; k < mediaTypeData.length; k += 1) {
        for (let j = 0; j < mediaTypeData[k].length; j += 1) {
            for (let i = 1; i <= 5; i += 1) {
                mediaTypeData[k][j].addRating(Math.floor(Math.random() * 6));
            }
        }
    }

    return mediaTypeData;
}


module.exports = mediaSeed(mediaTypeClasses, staticMediaData);