const prompt = require("prompt-sync")();
const banner = require('./src/banner');
// Models
const Book = require('./src/models/Book');
const Movie = require('./src/models/Movie');
const Cd = require('./src/models/CD');
// Seed data
const {mediaInstances, mediaTypeNames} = require('./src/data/seedGenerator');
// Request media type
const requestMediaType = require('./src/menus/mediaTypeMenu');  


// -----------------------------------------------------------------  G L O B A L   V A R I A B L E S

const actionFunctionsNames = ['MAIN MENU', 'ADD NEW ITEM', 'AVERAGE RATING', 'EDIT ITEM', 'REMOVE ITEM']


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
            mediaInstances[0].push(new Book(userInputTitle, userInputCreator, userInputPages));
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
            mediaInstances[1].push(new Movie(userInputTitle, userInputCreator, userInputRuntime));
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
            mediaInstances[2].push(new Cd(userInputTitle, userInputCreator, cdSongs));
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

 
// App initialization
console.log(banner());
requestMediaType(mediaTypeNames, mediaInstances);

















