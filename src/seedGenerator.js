const Book = require('./models/Book');
const Movie = require('./models/Movie');
const Cd = require('./models/CD');

const numMedia = [Book, Movie, Cd]

const mediaData = {
    book: [
        {
            title: 'The Housemaid',
            creator: 'Freida McFadden',
            pagesRuntimeSongs: 336
        },
        {
            title: 'A Little Life',
            creator: 'Hanya Yanagihara',
            pagesRuntimeSongs: 720
        }
    ],
    movie: [
        {
            title: 'Interestellar',
            creator: 'Christopher Nolan',
            pagesRuntimeSongs: 169
        },
        {
            title: 'Shrek',
            creator: 'Andrew Adamson & Vicky Jenson',
            pagesRuntimeSongs: 90
        }
    ],
    cd: [
        {
            title: 'The Death of Slim Shady (Coup de Grâce)',
            creator: 'Eminem',
            pagesRuntimeSongs: ['Habits', 'Trouble', 'Brand New Dance']
        },
        {
            title: 'Under My Skin',
            creator: 'Avril Lavigne',
            pagesRuntimeSongs: ['Don`t Tell Me', 'My Happy Ending', 'Freak Out']
        }
    ]
}


function mediaSeed(numMedia, mediaData) {
    const mediaTypeData = []
    const filledIndex = []

    for (const i in Object.values(mediaData)) {
        if (Object.values(mediaData)[i].length !== 0) {
            filledIndex.push(i)
        }
    }

    let currentValue = undefined;
    for (let i = 0; i < filledIndex.length; i += 1) {
        currentValue = filledIndex[i];
        mediaTypeData.push([]);
        for (let j = 0; j < (Object.values(mediaData)[currentValue].length); j += 1) {
            mediaTypeData[i].push(new numMedia[currentValue]((Object.values(mediaData)[currentValue])[j].title, (Object.values(mediaData)[currentValue])[j].creator, (Object.values(mediaData)[currentValue])[j].pagesRuntimeSongs))
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

module.exports = mediaSeed(numMedia, mediaData);