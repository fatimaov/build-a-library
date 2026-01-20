const prompt = require("prompt-sync")();






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
class Cd extends Media {
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



// -----------------------------------------------------------------  G L O B A L   V A R I A B L E S
let activeMediaTypeName = undefined;
let activeMediaTypeData = undefined;
const bookData = [];
const movieData = [];
const cdData = [];
const mediaTypeData = [bookData, movieData, cdData];
const mediaTypeNames = ['BOOKS', 'MOVIES', 'CDs'];
const actionFunctionsNames = ['MAIN MENU', 'ADD NEW ITEM', 'AVERAGE RATING', 'EDIT ITEM', 'REMOVE ITEM']

// -----------------------------------------------------------------  S E E D   D A T A 
bookData.push(new Book('The Housemaid', 'Freida McFadden', 336));
bookData.push(new Book('A Little Life', 'Hanya Yanagihara', 720));
movieData.push(new Movie('Interestellar', 'Christopher Nolan', 169));
movieData.push(new Movie('Shrek', 'Andrew Adamson & Vicky Jenson', 90));
cdData.push(new Cd('The Death of Slim Shady (Coup de Grâce)', 'Eminem', ['Habits', 'Trouble', 'Brand New Dance']));
cdData.push(new Cd('Under My Skin', 'Avril Lavigne', ['Don`t Tell Me', 'My Happy Ending', 'Freak Out']));
// Add random ratings to each seeded item
for (let k = 0; k < mediaTypeData.length; k += 1) {
    for (let j = 0; j < mediaTypeData[k].length; j += 1) {
        for (let i = 1; i <= 5; i += 1) {
            mediaTypeData[k][j].addRating(Math.floor(Math.random() * 6));
        }
    }
}

// -----------------------------------------------------------------  A C T I O N   F U N C T I O N S  
// -----------------------------------------------------------------  I T E M S   E X I S T
// Check whether the selected media type has any items
function itemsDontExist() {
    if (activeMediaTypeData.length === 0) {
        console.log(`\nNo items available in the '${activeMediaTypeName}' category`);
        return true;
    } else {
        return false;
    }
}

// -----------------------------------------------------------------  R E Q U E S T   I N D E X 
function requestIndex() {
    // Determine the valid index range
    const totalIndices = activeMediaTypeData.length - 1;
    // Prompt for and validate the item index
    let userInputIndex = undefined;
    do {
        userInputIndex = prompt(`    Enter the item index (0 - ${totalIndices}): `);
        if (userInputIndex.length === 0) {
            return false;
        }
        // Convert input to a number for validation
        userInputIndex = Number(userInputIndex);
    } while (userInputIndex > totalIndices || userInputIndex < 0 || Number.isNaN(userInputIndex) || !Number.isInteger(userInputIndex))
    return userInputIndex;
}

// -----------------------------------------------------------------  R E Q U E S T   A D D   I T E M 
function requestAddItem() {
    let userInputAddItem = undefined;
    do {
        console.log(`            Confirm adding this item?
            [y] - YES
            [n] - NO`);
        userInputAddItem = prompt().toLowerCase().trim();
    } while (userInputAddItem !== 'y' && userInputAddItem !== 'n');
    return userInputAddItem;
}

// -----------------------------------------------------------------  D I S P L A Y   I T E M S
// Display all items for the selected media type
function displayItems() {
    if (itemsDontExist()) {
        return requestAction();
    };
    console.table(activeMediaTypeData);
    return requestAction();
}

// -----------------------------------------------------------------  A D D   I T E M
function addItem() {
    // Display action header
    console.log(`\n${activeMediaTypeName} > ${actionFunctionsNames[1]}`);
    console.log(''.padEnd(70, '· '));
    // Prompt for and validate title
    let userInputTitle = undefined;
    do {
        userInputTitle = prompt(`    Enter a title: `).trim();
    } while (userInputTitle.length === 0);
    // Prompt for and validate creator
    let userInputCreator = undefined;
    do {
        userInputCreator = prompt(`    Enter an author, director, or artist: `).trim();
    } while (userInputCreator.length === 0);

    // Handle book-specific properties
    if (activeMediaTypeName === mediaTypeNames[0]) {
        // Prompt for and validate number of pages
        let userInputPages = undefined;
        do {
            userInputPages = +prompt(`    Enter the number of pages: `).trim();
        } while (Number.isNaN(userInputPages) || userInputPages < 1 || userInputPages > 1500 || !Number.isInteger(userInputPages))
        // Prompt to confirm adding the item
        const addItem = requestAddItem();
        if (addItem === 'y') {
            // If confirmed, create and add the book, then display all books
            bookData.push(new Book(userInputTitle, userInputCreator, userInputPages));
            return displayItems();
        } else if (addItem === 'n') {
            // If cancelled, return to the action menu
            return requestAction();
        }
    }

    // Handle movie-specific properties
    else if (activeMediaTypeName === mediaTypeNames[1]) {
        // Prompt for and validate runtime
        let userInputRuntime = undefined;
        do {
            userInputRuntime = +prompt(`    Enter runtime (in minutes): `).trim();
        } while (Number.isNaN(userInputRuntime) || userInputRuntime < 1 || !Number.isInteger(userInputRuntime) || userInputRuntime > 600)
        // Prompt to confirm adding the item
        const addItem = requestAddItem();
        if (addItem === 'y') {
            // If confirmed, create and add the movie, then display all movies
            movieData.push(new Movie(userInputTitle, userInputCreator, userInputRuntime));
            return displayItems();
        } else if (addItem === 'n') {
            // If cancelled, return to the action menu
            return requestAction();
        }
    }

    // Handle cd-specific properties
    else if (activeMediaTypeName === mediaTypeNames[2]) {
        const cdSongs = [];
        const addSong = (newSong) => {
            cdSongs.push(newSong);
        }
        let userInputAnotherSong = undefined;
        do {
            // Prompt for and validate song title
            let userInputSong = undefined;
            do {
                userInputSong = prompt(`    Enter song title: `).trim();
            } while (userInputSong.length === 0);
            addSong(userInputSong);
            // Ask whether to add another song
            do {
                console.log(`        Add another song?
        [y] - YES
        [n] - NO`);
                userInputAnotherSong = prompt().toLowerCase().trim();
            } while (userInputAnotherSong !== 'y' && userInputAnotherSong !== 'n')
        } while (userInputAnotherSong === 'y');
        // Prompt to confirm adding the item
        const addItem = requestAddItem();
        if (addItem === 'y') {
            // If confirmed, create and add the CD, then display all CDs
            cdData.push(new Cd(userInputTitle, userInputCreator, cdSongs));
            return displayItems();
        } else if (addItem === 'n') {
            // If cancelled, return to the action menu
            return requestAction();
        }
    }
}

// -----------------------------------------------------------------  L O G   A V E R A G E   R A T I N G
function logAverageRating() {
    // Display action header
    console.log(`\n${activeMediaTypeName} > ${actionFunctionsNames[2]}`);
    console.log(''.padEnd(70, '· '));
    // Ensure items exist before continuing
    if (itemsDontExist()) {
        return requestAction();
    };
    // Prompt for and validate the item index 
    const indexOfItem = requestIndex();
    if (indexOfItem === false) {
        return requestAction();
    }
    // Inform the user if the item has no ratings
    if (activeMediaTypeData[indexOfItem].ratings.length === 0) {
        console.log(`\nThis item has no ratings yet.`);
        return requestAction();
    }
    // Display star-based rating visualization
    const starSymbol = '◆ ';
    let starRating = [];
    for (let i = 1; i <= Math.floor(activeMediaTypeData[indexOfItem].getAverageRating()); i += 1) {
        starRating.push(starSymbol);
    }
    console.log(`\n${starRating.join('')}`.padEnd(10, '◇ '));
    console.log(activeMediaTypeData[indexOfItem].getAverageRating());
    return requestAction();
}

// -----------------------------------------------------------------  E D I T   I T E M
function editItem() {
    // Display action header
    console.log(`\n${activeMediaTypeName} > ${actionFunctionsNames[3]}`);
    console.log(''.padEnd(70, '· '));
    // Ensure items exist before continuing
    if (itemsDontExist()) {
        return requestAction();
    };
    // Prompt for and validate the item index 
    const indexOfItem = requestIndex();
    if (indexOfItem === false) {
        return requestAction();
    }
    // Prompt for and validate the selected task
    let userInputTaskToPerform = undefined;
    const taskToPerform = ['1', '2'];
    do {
        console.log(`    Select a task:
            [1] - Toggle check-out state
            [2] - Add a new rating`);
        userInputTaskToPerform = prompt().trim();
        // Exit action and return to Action Menu when Enter is pressed
        if (userInputTaskToPerform.length === 0) {
            return requestAction();
        }
    } while (!taskToPerform.includes(userInputTaskToPerform))
    // Toggle check-out state
    if (userInputTaskToPerform === taskToPerform[0]) {
        activeMediaTypeData[indexOfItem].toggleCheckedOutStatus();
        console.table(activeMediaTypeData[indexOfItem]);
    } else if (userInputTaskToPerform === taskToPerform[1]) {
        // Prompt for and validate rating value
        let userInputRatingValue = undefined;
        do {
            userInputRatingValue = prompt(`    Enter a rating (0-1-2-3-4-5): `).trim();
            if (userInputRatingValue.length === 0) {
                return requestAction();
            }
            userInputRatingValue = Number(userInputRatingValue);
        } while (userInputRatingValue < 0 || userInputRatingValue > 5 || Number.isNaN(userInputRatingValue) || !Number.isInteger(userInputRatingValue))
        // Add the new rating to the selected item
        activeMediaTypeData[indexOfItem].addRating(userInputRatingValue);
        console.table(activeMediaTypeData[indexOfItem]);
    }
    return requestAction();
}

// -----------------------------------------------------------------  R E M O V E   I T E M
function removeItem() {
    // Display action header
    console.log(`\n${activeMediaTypeName} > ${actionFunctionsNames[4]} `);
    console.log(''.padEnd(70, '· '));
    // Ensure items exist before continuing
    if (itemsDontExist()) {
        return requestAction();
    };
    // Prompt for and validate the item index 
    const indexOfItem = requestIndex();
    if (indexOfItem === false) {
        return requestAction();
    }
    // Remove the item at the selected index
    activeMediaTypeData.splice(indexOfItem, 1);
    return displayItems();
}


// -----------------------------------------------------------------  R E Q U E S T   M E D I A   T Y P E
function requestMediaType() {
    // Display Main Menu header
    console.log(`\n${actionFunctionsNames[0]}`);
    console.log(''.padEnd(70, '· '));
    // Prompt for and validate media type selection
    const mediaTypes = ['1', '2', '3'];
    let userInputMediaType = undefined;
    do {
        console.log(`Select a media type (or press Enter to exit the app):
    [1] - Books
    [2] - Movies
    [3] - CDs`);
        userInputMediaType = prompt().trim();
        // Exit the App when Enter is pressed
        if (userInputMediaType.length === 0) {
            return;
        }
    } while (!mediaTypes.includes(userInputMediaType))
    // Set the active media array based on user selection
    activeMediaTypeName = mediaTypeNames[Number(userInputMediaType) - 1];
    activeMediaTypeData = mediaTypeData[Number(userInputMediaType) - 1];
    // Display the action menu for the selected media type
    return requestAction();
}

// -----------------------------------------------------------------  R E Q U E S T   A C T I O N   
function requestAction() {
    // Display Action Menu header
    console.log(`\n${activeMediaTypeName}`);
    console.log(''.padEnd(70, '· '));
    // Prompt for and validate action selection
    let userInputAction = undefined;
    const actionToPerform = ['1', '2', '3', '4', '5', '6'];
    const actionFunctions = [displayItems, addItem, logAverageRating, editItem, removeItem];
    do {
        console.log(`Select an action to perform (or press Enter to go to MAIN MENU): 
    [1] - Display items
    [2] - Add new item 
    [3] - Show average rating 
    [4] - Toggle isCheckedOut OR add a new rating 
    [5] - Remove item`);
        userInputAction = prompt().trim();
        // Return to Main Menu when Enter is pressed
        if (userInputAction.length === 0) {
            return requestMediaType();
        }
    } while (!actionToPerform.includes(userInputAction))
    // Execute the selected action
    return actionFunctions[Number(userInputAction) - 1]();
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

















