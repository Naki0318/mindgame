let timer;
let score = 0;
const maxScore = 14;

function startTimer(seconds) {
    
    let timeLeft = seconds;

    timer = setInterval(() => {
        timeLeft--;

        // oras
        document.getElementById('husga').textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            finishGame();
        }
    }, 1000);
}

function finishGame() {
    // tigil
    clearInterval(timer);

    // flip lahat
    document.querySelectorAll('.board').forEach(tile => {
        tile.classList.add('flipped');
    });

    // score
    const matchedTiles = document.querySelectorAll('.board.matched').length;
    score = matchedTiles/2;

    // palit display score
    document.getElementById('husga').textContent = `Game finished. Your score: ${score}`;
}

function restartGame() {
    // Stop the timer if it's running
    clearInterval(timer);

    // Reset time and score
    timeLeft = 100; // Set the desired restart time
    score = 0;

    // Update displays
    document.getElementById('husga').textContent = `Time left: ${timeLeft}s`;

    // Flip all tiles back
    document.querySelectorAll('.board').forEach(tile => {
        tile.classList.remove('flipped', 'matched');
    });

    // Start the timer again
    startTimer();
}
// 
document.querySelectorAll('.button-32').forEach(tile => {
    tile.addEventListener('click', () => {
        clearInterval(timer);
        startTimer(101);

        
    });
});


document.querySelectorAll('.board').forEach(tile => {
    tile.addEventListener('click', () => {
        tile.classList.add('flipped');
        setTimeout(() => {
            checkMatches();
        }, 1000); // Delay added to allow the tiles to flip before checking matches
    });
});

function checkMatches() {
    const flippedTiles = document.querySelectorAll('.board.flipped');

    // Check for matches only when the number of flipped tiles is even
    if (flippedTiles.length % 2 === 0) {
        for (let i = 0; i < flippedTiles.length; i += 2) {
            const tile1 = flippedTiles[i];
            const tile2 = flippedTiles[i + 1];

            if (tile1.id === tile2.id) {

                tile1.classList.add('matched');
                tile2.classList.add('matched');
                tile1.classList.remove('flipped');
                tile2.classList.remove('flipped');
            
            } else {
                setTimeout(() => {
                    tile1.classList.remove('flipped');
                    tile2.classList.remove('flipped');
                    
                }, 1000);
            }
        }
    }
}
