const prompt = require("prompt-sync")();
const requestAction = require('./actionMenu');

function requestMediaType(mediaTypeNames, mediaInstances) {
    // Display Main Menu header
    console.log(`\nMAIN MENU`);
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
    activeMediaTypeData = mediaInstances[Number(userInputMediaType) - 1];
    // Display the action menu for the selected media type
    return requestAction(activeMediaTypeName, activeMediaTypeData);
}

module.exports = requestMediaType;