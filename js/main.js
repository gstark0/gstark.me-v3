function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

function scrollIt(destination, duration=1000, callback) {

    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
            callback();
        } return;
    }

    function scroll() {
        const now = 'now' in window.performance ? performance.now() : new Date().getTime();
        const time = Math.min(1, ((now - startTime) / duration));
        const timeFunction = easeInOutCubic(time);
        window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

        if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
                callback();
            } return;
        }

        requestAnimationFrame(scroll);
    }

    scroll();
}


// Headline animation
var animationDelay = 2500;
animateHeadline(document.getElementById('main-header'));

function animateHeadline(headline) {
    setTimeout(function(){
        hideWord( headline.getElementsByClassName('is-visible')[0] )
    }, animationDelay);
}

function hideWord(word) {
    var nextWord = takeNext(word);
    switchWord(word, nextWord);
    setTimeout(function(){
        hideWord(nextWord)
    }, animationDelay);
}

function takeNext(word) {
    let nextWord = word.nextElementSibling;
    if(nextWord != null)
        return nextWord;
    else {
        return word.parentElement.firstElementChild;
    }
}

function switchWord(oldWord, newWord) {
    oldWord.className = 'is-hidden';
    newWord.className = 'is-visible';
}