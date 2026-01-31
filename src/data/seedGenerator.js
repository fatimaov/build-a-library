// Static data and media type classes
const { mediaTypeClasses, staticMediaData } = require('./staticData');

function addRandomRating(mediaInstances) {
    for (let k = 0; k < mediaInstances.length; k += 1) {
        for (let j = 0; j < mediaInstances[k].length; j += 1) {
            for (let i = 1; i <= 5; i += 1) {
                mediaInstances[k][j].addRating(Math.floor(Math.random() * 6));
            }
        }
    }
    return mediaInstances;
}

function getNonEmptyMediaIndices(mediaValues) {
        const nonEmptyIndices = [];
        for (const mediaIndex in mediaValues) {
            if (mediaValues[mediaIndex].length !== 0) {
                nonEmptyIndices.push(mediaIndex)
            }
        }
        return nonEmptyIndices;
    }

function generateMediaInstances(mediaTypeClasses, staticMediaData) {
    // Collect indices of media types with existing data to enable dynamic instance generation
    const mediaValues = Object.values(staticMediaData);
    const nonEmptyIndices = getNonEmptyMediaIndices(mediaValues);
    
    // Generate media instances grouped by media type, preserving the fixed order
    // between static data (staticMediaData) and corresponding media classes (mediaTypeClasses)
    // (books → movies → CDs)
    const mediaInstances = [];
    let currentNonEmptyIndex = undefined;
    for (let i = 0; i < nonEmptyIndices.length; i += 1) {
        currentNonEmptyIndex = nonEmptyIndices[i];
        mediaInstances.push([]);
        for (let j = 0; j < (mediaValues[currentNonEmptyIndex].length); j += 1) {
            mediaInstances[i].push(
                new mediaTypeClasses[currentNonEmptyIndex](
                    (mediaValues[currentNonEmptyIndex])[j].title,
                    (mediaValues[currentNonEmptyIndex])[j].creator,
                    (mediaValues[currentNonEmptyIndex])[j].metadata
                )
            )
        }
    }

    // // Add random ratings to each seeded item
    addRandomRating(mediaInstances);

    return mediaInstances;
}

const mediaInstances = generateMediaInstances(mediaTypeClasses, staticMediaData);
const mediaTypeNames = ['BOOKS', 'MOVIES', 'CDs'];

module.exports = {mediaInstances, mediaTypeNames} ;