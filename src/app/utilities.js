const reduceParagraph = (paragraph, numWord) => {
    var list_word = paragraph.split(" ");
    var res = "";
    for (var i = 0; i < Math.min(numWord, list_word.length); i++) {
        res = res + list_word[i] + " ";
    }
    return res + " ...";
};


function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export { shuffleArray, reduceParagraph, millisToMinutesAndSeconds };