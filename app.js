const prompt = require("prompt-sync")();


// -----------------------------------------------------------------  G L O B A L   V A R I A B L E S
let userInputMediaType = undefined;
let userInputAction = undefined;
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
const actionFunctions = [displayItems, addItem, consultItem, editItem, removeItem];

// -----------------------------------------------------------------  C L A S S E S 
// Parent class
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
// Child class extending Media
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
// Child class extending Media
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
// Child class extending Media
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

// -------------------------  S E E D   D A T A 
bookItems.push(new Book('The Housemaid', 'Freida McFadden', 336));
bookItems.push(new Book('A Little Life', 'Hanya Yanagihara', 720));
movieItems.push(new Movie('Interestellar', 'Christopher Nolan', 169));
movieItems.push(new Movie('Shrek', 'Andrew Adamson & Vicky Jenson', 90));
cdItems.push(new CD('The Death of Slim Shady (Coup de Grâce)', 'Eminem', ['Habits', 'Trouble', 'Brand New Dance']));
cdItems.push(new CD('Under My Skin', 'Avril Lavigne', ['Don`t Tell Me', 'My Happy Ending', 'Freak Out']));
// Add random ratings to each seeded item
for (let k = 0; k < mediaItems.length; k += 1) {
    for (let j = 0; j < mediaItems[k].length; j += 1) {
        for (let i = 1; i <= 5; i += 1) {
            mediaItems[k][j].addRating(Math.floor(Math.random() * 6));
        }
    }
}

// -----------------------------------------------------------------  A C T I O N   F U N C T I O N S  
// ------------------------------------------  I T E M S   E X I S T
// Check whether the selected media type has any items
function itemsExist() {
    if (mediaTypeData.length === 0) {
        console.log(`\nNo items available in the '${mediaTypesNames[indexMediaTypeData]}' category`);
        return true;
    } else {
        return false;
    }
}

// ------------------------------------------  D I S P L A Y   I T E M S
// Display all items for the selected media type
function displayItems() {
    if (itemsExist()) {
        return requestAction();
    };
    console.table(mediaTypeData);
    return requestAction();
}

// ------------------------------------------  A D D   I T E M
function addItem() {
    // Display action header
    console.log(`\n${mediaTypesNames[indexMediaTypeData]} > ADD NEW ITEM`);
    console.log(''.padEnd(70, '· '));
    // Prompt for and validate title and creator
    let addItemTitle = undefined;
    let addItemCreator = undefined;
    do {
        addItemTitle = prompt(`    Enter a title: `).trim();
    } while (addItemTitle.length === 0)
    do {
        addItemCreator = prompt(`    Enter an author, director, or artist: `).trim();
    } while (addItemCreator.length === 0)


    // Handle book-specific properties
    if (indexMediaTypeData === 0) {
        let addPages = undefined;
        let confirmItem = undefined;
        // Prompt for and validate number of pages
        do {
            addPages = +prompt(`    Enter the number of pages: `).trim();
        } while (Number.isNaN(addPages) || addPages < 1 || addPages > 1500 || !Number.isInteger(addPages))
        // Prompt to confirm adding the item
        do {
            console.log(`        Confirm adding this item?
        [y] - YES
        [n] - NO`);
            confirmItem = prompt().toLocaleLowerCase().trim();
        } while (confirmItem !== 'y' && confirmItem !== 'n')
        if (confirmItem === 'y') {
            // If confirmed, create and add the book, then display all books
            bookItems.push(new Book(addItemTitle, addItemCreator, addPages));
            return displayItems();
        } else if (confirmItem === 'n') {
            // If cancelled, return to the action menu
            return requestAction();
        }
    }


    // Handle movie-specific properties
    if (indexMediaTypeData === 1) {
        let addRuntime = undefined;
        let confirmItem = undefined;
        // Prompt for and validate runtime
        do {
            addRuntime = +prompt(`    Enter runtime (in minutes): `).trim();
        } while (Number.isNaN(addRuntime) || addRuntime < 1 || !Number.isInteger(addRuntime) || addRuntime > 600)
        // Prompt to confirm adding the item
        do {
            console.log(`        Confirm adding this item?
        [y] - YES
        [n] - NO`);
            confirmItem = prompt().toLocaleLowerCase().trim();
        } while (confirmItem !== 'y' && confirmItem !== 'n')
        if (confirmItem === 'y') {
            // If confirmed, create and add the movie, then display all movies
            movieItems.push(new Movie(addItemTitle, addItemCreator, addRuntime));
            return displayItems();
        } else if (confirmItem === 'n') {
            // If cancelled, return to the action menu
            return requestAction();
        }
    }


    // Handle CD-specific properties
    if (indexMediaTypeData === 2) {
        const cdSongs = [];
        let addSong = undefined;
        let repeatAddSong = undefined;
        const addNewSong = (newSong) => {
            cdSongs.push(newSong);
        }
        let confirmItem = undefined;
        do {
            // Prompt for and validate song title
            do {
                addSong = prompt(`    Enter song title: `).trim();
            } while (addSong.length === 0);
            // Add song to the list
            addNewSong(addSong);
            // Ask whether to add another song
            do {
                console.log(`        Add another song?
        [y] - YES
        [n] - NO`);
                repeatAddSong = prompt().toLowerCase().trim();
            } while (repeatAddSong !== 'y' && repeatAddSong !== 'n')
        } while (repeatAddSong === 'y');
        // Prompt to confirm adding the CD
        do {
            console.log(`            Confirm adding this item?
            [y] - YES
            [n] - NO`);
            confirmItem = prompt().toLocaleLowerCase().trim();
        } while (confirmItem !== 'y' && confirmItem !== 'n');
        if (confirmItem === 'y') {
            // If confirmed, create and add the CD, then display all CDs
            cdItems.push(new CD(addItemTitle, addItemCreator, cdSongs));
            return displayItems();
        } else if (confirmItem === 'n') {
            // If cancelled, return to the action menu
            return requestAction();
        }
    }
    return requestAction();
}

// ------------------------------------------  C O N S U L T   I T E M 
function consultItem() {
    // Display action header
    console.log(`\n${mediaTypesNames[indexMediaTypeData]} > AVERAGE RATING`);
    console.log(''.padEnd(70, '· '));
    // Ensure items exist before continuing
    if (itemsExist()) {
        return requestAction();
    };
    // Determine the valid index range
    totalIndices = mediaTypeData.length - 1;
    // Prompt for and validate item index
    do {
        indexOfItem = prompt(`    Enter the item index (0 - ${totalIndices}): `);
        // Exit action and return to Action Menu when Enter is pressed
        if (indexOfItem.length === 0) {
            return requestAction();
        }
        // Convert input to a number for validation
        indexOfItem = Number(indexOfItem);
    } while (indexOfItem > totalIndices || indexOfItem < 0 || Number.isNaN(indexOfItem) || !Number.isInteger(indexOfItem))
    // Inform the user if the item has no ratings
    if (mediaTypeData[indexOfItem].ratings.length === 0) {
        console.log(`\nThis item has no ratings yet.`);
        return requestAction();
    }
    // Display star-based rating visualization
    const starSymbol = '◆ ';
    let starRating = [];
    for (let i = 1; i <= Math.floor(mediaTypeData[indexOfItem].getAverageRating()); i += 1) {
        starRating.push(starSymbol);
    }
    console.log(`\n${starRating.join('')}`.padEnd(10, '◇ '));
    console.log(mediaTypeData[indexOfItem].getAverageRating());
    return requestAction();
}

// ------------------------------------------  E D I T   I T E M
function editItem() {
    const taskToPerformMessage = `    Select a task:
        [1] - Toggle isCheckedOut
        [2] - Add a new rating`;
    let userInputTaskToPerform = undefined;
    const taskToPerform = ['1', '2'];
    let newRatingValue = undefined;
    // Display action header
    console.log(`\n${mediaTypesNames[indexMediaTypeData]} > EDIT ITEM`);
    console.log(''.padEnd(70, '· '));
    // Ensure items exist before continuing
    if (itemsExist()) {
        return requestAction();
    };
    // Determine the valid index range
    totalIndices = mediaTypeData.length - 1;
    // Prompt for and validate the item index
    do {
        indexOfItem = prompt(`    Enter the item index (0 - ${totalIndices}): `);
        // Exit action and return to Action Menu when Enter is pressed
        if (indexOfItem.length === 0) {
            return requestAction();
        }
        // Convert input to a number for validation
        indexOfItem = Number(indexOfItem);
    } while (indexOfItem > totalIndices || indexOfItem < 0 || Number.isNaN(indexOfItem) || !Number.isInteger(indexOfItem))
    // Prompt for and validate the selected task
    do {
        console.log(taskToPerformMessage);
        userInputTaskToPerform = prompt().trim();
        // Exit action and return to Action Menu when Enter is pressed
        if (userInputTaskToPerform.length === 0) {
            return requestAction();
        }
    } while (!taskToPerform.includes(userInputTaskToPerform))
    // Toggle checked out status
    if (userInputTaskToPerform === taskToPerform[0]) {
        mediaTypeData[indexOfItem].toggleCheckedOutStatus();
        console.table(mediaTypeData[indexOfItem]);
    } else {
        // Prompt for and validate rating value
        do {
            newRatingValue = prompt(`    Enter a rating (0-1-2-3-4-5): `).trim();
            if (newRatingValue.length === 0) {
                return requestAction();
            }
            newRatingValue = Number(newRatingValue);
        } while (newRatingValue < 0 || newRatingValue > 5 || Number.isNaN(newRatingValue) || !Number.isInteger(newRatingValue))
        // Add the new rating to the selected item
        mediaTypeData[indexOfItem].addRating(newRatingValue);
        console.table(mediaTypeData[indexOfItem]);
    }
    return requestAction();
}

// ------------------------------------------  R E M O V E   I T E M
function removeItem() {
    // Display action header
    console.log(`\n${mediaTypesNames[indexMediaTypeData]} > REMOVE ITEM `);
    console.log(''.padEnd(70, '· '));
    // Ensure items exist before continuing
    if (itemsExist()) {
        return requestAction();
    };
    // Determine the valid index range
    totalIndices = mediaTypeData.length - 1;
    // Prompt for and validate the item index
    do {
        indexOfItem = prompt(`    Enter the item index (0 - ${totalIndices}): `);
        // Exit action and return to Action Menu when Enter is pressed
        if (indexOfItem.length === 0) {
            return requestAction();
        }
        // Convert input to a number for validation
        indexOfItem = Number(indexOfItem);
    } while (indexOfItem > totalIndices || indexOfItem < 0 || Number.isNaN(indexOfItem) || !Number.isInteger(indexOfItem))
    // Remove the item at the selected index
    mediaTypeData.splice(indexOfItem, 1);
    return displayItems();
}


// -----------------------------------------------------------------  R E Q U E S T   M E D I A   T Y P E
function requestMediaType() {
    const mainMenuMessage = `Select a media type (or press Enter to exit the app):
    [1] - Books
    [2] - Movies
    [3] - CDs`;
    // Display Main Menu header
    console.log(`MAIN MENU`);
    console.log(''.padEnd(70, '· '));
    // Prompt for and validate media type selection
    do {
        console.log(mainMenuMessage);
        userInputMediaType = prompt().trim();
        // Exit the App when Enter is pressed
        if (userInputMediaType.length === 0) {
            return;
        }
    } while (!mediaTypes.includes(userInputMediaType))
    // Set the active media array based on user selection
    indexMediaTypeData = mediaTypes.indexOf(userInputMediaType);
    mediaTypeData = mediaItems[mediaTypes.indexOf(userInputMediaType)];
    // Display the action menu for the selected media type
    return requestAction();
}

// -----------------------------------------------------------------  R E Q U E S T   A C T I O N   
function requestAction() {
    const actionInfoMessage = `Select an action to perform (or press Enter to go to MAIN MENU): 
    [1] - Display items
    [2] - Add new item 
    [3] - Log the average rating 
    [4] - Toggle isCheckedOut OR add a new rating 
    [5] - Remove item`;
    // Display Action Menu header
    console.log(`\n${mediaTypesNames[indexMediaTypeData]}`);
    console.log(''.padEnd(70, '· '));
    // Prompt for and validate action selection
    do {
        console.log(actionInfoMessage);
        userInputAction = prompt().trim();
        // Return to Main Menu when Enter is pressed
        if (userInputAction.length === 0) {
            return requestMediaType();
        }
    } while (!actionToPerform.includes(userInputAction))
    // Execute the selected action
    return actionFunctions[actionToPerform.indexOf(userInputAction)]();
}

// -----------------------------------------------------------------  A P P   I N I T I A L I Z A T I O N 
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

















