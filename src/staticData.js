const Book = require('./models/Book');
const Movie = require('./models/Movie');
const Cd = require('./models/CD');

const mediaTypeClasses = [Book, Movie, Cd]

const staticMediaData = {
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


module.exports = { mediaTypeClasses, staticMediaData };