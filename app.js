const prompt = require("prompt-sync")();


// -------------------------  G L O B A L   V A R I A B L E S
const mainMenuMessage = `Enter a media type:
    [1] - Books
    [2] - Movies
    [3] - CDs`;
const actionInfoMessage = `Enter an action to perform: 
    [1] - Display items
    [2] - Add new item 
    [3] - Log the average rating 
    [4] - Toggle isCheckedOut OR add a new rating 
    [5] - Remove item
    [6] - Exit to main menu`;
let userInputMediaType = undefined;
let indexMediaTypeData = undefined;
let mediaTypeData = undefined;
let totalIndices = undefined;
let indexOfItem = undefined;
const mediaTypes = ['1', '2', '3'];
const mediaTypesNames = ['BOOKS', 'MOVIES', 'CDs'];
const bookItems = [];
const movieItems = [];
const cdItems = [];
const mediaItems = [bookItems, movieItems, cdItems];
const actionToPerform = ['1', '2', '3', '4', '5', '6'];
const actionFunctions = [displayItems, addItem, consultItem, modifyItem, removeItem, requestMediaType];

// -------------------------  C L A S S E S   D E C L A R A T I O N  
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
class Book extends Media {
    constructor(title, author, pages) {
        super(title);
        this._author = author;
        this._pages = pages;
    }

    get author() {
        return this._author;
    }

    get pages() {
        return this._pages;
    }

}
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
class CD extends Media {
    constructor(title, artist, songs) {
        super(title);
        this._artist = artist;
        this._songs = songs;
    }

    get artist() {
        return this._artist;
    }

    get songs() {
        return this._songs;
    }
}

// -------------------------  A D D   S O M E   D A T A   
bookItems.push(new Book('The Housemaid', 'Freida McFadden', 336));
bookItems.push(new Book('A Little Life', 'Hanya Yanagihara', 720));
movieItems.push(new Movie('Interestellar', 'Christopher Nolan', 169));
movieItems.push(new Movie('Shrek', 'Andrew Adamson & Vicky Jenson', 90));
cdItems.push(new CD('The Death of Slim Shady (Coup de Grâce)', 'Eminem', ['Habits', 'Trouble', 'Brand New Dance']));
cdItems.push(new CD('Under My Skin', 'Avril Lavigne', ['Don`t Tell Me', 'My Happy Ending', 'Freak Out']));
for (let k = 0; k < mediaItems.length; k += 1) {
    for (let j = 0; j < mediaItems[k].length; j += 1) {
        for (let i = 1; i <= 5; i += 1) {
            mediaItems[k][j].addRating(Math.floor(Math.random()*6));
        }
    }
}

// -------------------------  A C T I O N   F U N C T I O N S  
function displayItems() {
    if (mediaTypeData.length === 0) {
        console.log(`No items in '${userInputMediaType}' category`);
    } else {
        console.table(mediaTypeData);
    }
    return requestAction();
}
function addItem() {
console.log('ADD NEW ITEM '.padEnd(30, '-'));
    let addItemTitle = prompt(`    Enter a title: `);
    while (addItemTitle.length === 0) {
        addItemTitle = prompt(`    Enter a title: `);
    }

    let addItemCreator = prompt(`    Enter a author/director/artist: `);
    while (addItemCreator.length === 0) {
        addItemCreator = prompt(`    Enter a author/director/artist: `);
    }

    // Book media type mediaItems[0]
    if (indexMediaTypeData === 0) {
        let addPages = +prompt(`    Enter number of pages: `);
        while (Number.isNaN(addPages) || addPages === 0) {
            addPages = +prompt(`    Enter number of pages: `);
        }
        bookItems.push(new Book(addItemTitle, addItemCreator, addPages));
        displayItems();
    }

    // Movie media type mediaItems[1]
    if (indexMediaTypeData === 1) {
        let addRuntime = +prompt(`    Enter runtime: `);
        while (Number.isNaN(addRuntime) || addRuntime === 0) {
            addRuntime = +prompt(`    Enter runtime: `);
        }
        movieItems.push(new Movie(addItemTitle, addItemCreator, addRuntime));
        displayItems();
    }

    // CD media type mediaItems[2]
    if (indexMediaTypeData === 2) {
        const cdSongs = [];
        let addSong = undefined;
        let repeatAddSong = undefined;
        const addNewSong = (newSong) => {
            cdSongs.push(newSong);
        }
        do {
            addSong = prompt(`    Enter song name: `);
            while (addSong.length === 0) {
                addSong = prompt(`    Enter song name: `);
            };
            addNewSong(addSong);
            console.log(`        Add another song?
        [y] - YES
        [n] - NO`);
        repeatAddSong = prompt();
        } while (repeatAddSong.toLowerCase().trim() === 'y');

        cdItems.push(new CD(addItemTitle, addItemCreator, cdSongs));
        displayItems();
    }
    return requestAction();
}
function consultItem() {
    console.log('AVERAGE RATING '.padEnd(30,'-'));
    totalIndices = mediaTypeData.length - 1;
    indexOfItem = prompt(`    Enter item index (0 - ${totalIndices}): `);
    while (indexOfItem > totalIndices) {
        indexOfItem = prompt(`    Enter item index (0 - ${totalIndices}): `);
    }
    console.log(mediaTypeData[indexOfItem].getAverageRating());
    requestAction();
}
function modifyItem() {

}
function removeItem() {
    console.log('REMOVE ITEM '.padEnd(30,'-'));
    totalIndices = mediaTypeData.length - 1;
    indexOfItem = prompt(`    Enter index of the item to remove (0 - ${totalIndices}): `);
    while (indexOfItem > totalIndices) {
        indexOfItem = prompt(`    Enter index of the item to remove (0 - ${totalIndices}): `);
    }
    mediaTypeData.splice(indexOfItem, 1);
    displayItems();
    requestAction();
}


// -------------------------  R E Q U E S T   M E D I A   T Y P E
function requestMediaType() {
    console.log(`
MAIN MENU `.padEnd(30, '-'));
    console.log(mainMenuMessage);
    userInputMediaType = prompt();
    userInputMediaType = userInputMediaType.trim();
    // Validate media type input
    while (!mediaTypes.includes(userInputMediaType)) {
        console.log(`
            MAIN MENU `.padEnd(30, '-'));
        console.log(mainMenuMessage);
        userInputMediaType = prompt();
        userInputMediaType = userInputMediaType.trim();
    }
    // Get the array inside mediaItems that matches the selected media type
    indexMediaTypeData = mediaTypes.indexOf(userInputMediaType);
    mediaTypeData = mediaItems[mediaTypes.indexOf(userInputMediaType)];
    requestAction();
}

// -------------------------  R E Q U E S T   A C T I O N   
function requestAction() {
    console.log(`
${mediaTypesNames[indexMediaTypeData].padEnd(30, '-')}`);
    console.log(actionInfoMessage);
    let userInputAction = prompt();
    userInputAction = userInputAction.trim();
    // Validate action input
    while (!actionToPerform.includes(userInputAction)) {
        console.log(actionInfoMessage);
        userInputAction = prompt();
        userInputAction = userInputAction.trim();
    }
    actionFunctions[actionToPerform.indexOf(userInputAction)]();
}




console.log(`
  ######                                    ### #     #        #####                            
  #     #  ####   ####  #    #  ####        ### ##    #       #     # ##### #    # ###### ######
  #     # #    # #    # #   #  #             #  # #   #       #         #   #    # #      #     
  ######  #    # #    # ####    ####  ##### #   #  #  # #####  #####    #   #    # #####  ##### 
  #     # #    # #    # #  #        #           #   # #             #   #   #    # #      #     
  #     # #    # #    # #   #  #    #           #    ##       #     #   #   #    # #      #     
  ######   ####   ####  #    #  ####            #     #        #####    #    ####  #      #     


`);

requestMediaType();

















