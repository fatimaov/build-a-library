const Book = require('./models/Book');
const Movie = require('./models/Movie');
const Cd = require('./models/CD');

const mediaTypeClasses = [Book, Movie, Cd]

// Manually defined static media data.
// Media type order must stay in sync with the media classes array (mediaTypeClasses)
// to preserve correct data-to-class mapping.
const staticMediaData = {
    book: [
        {
            title: 'The Housemaid',
            creator: 'Freida McFadden',
            metadata: 336
        },
        {
            title: 'A Little Life',
            creator: 'Hanya Yanagihara',
            metadata: 720
        }
    ],
    movie: [
        {
            title: 'Interestellar',
            creator: 'Christopher Nolan',
            metadata: 169
        },
        {
            title: 'Shrek',
            creator: 'Andrew Adamson & Vicky Jenson',
            metadata: 90
        }
    ],
    cd: [
        {
            title: 'The Death of Slim Shady (Coup de Grâce)',
            creator: 'Eminem',
            metadata: ['Habits', 'Trouble', 'Brand New Dance']
        },
        {
            title: 'Under My Skin',
            creator: 'Avril Lavigne',
            metadata: ['Don`t Tell Me', 'My Happy Ending', 'Freak Out']
        }
    ]
}

module.exports = { mediaTypeClasses, staticMediaData };