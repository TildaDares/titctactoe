const Player = (name, tag, type) => {
    return { name, tag, type };
}

const gameFactory = (() => {
    let playerOne, playerTwo, currentPlayer;
    let count = 0;
    let gameArray = new Array(9).fill('');
    let tagBtns = document.querySelectorAll('.tag-btn')
    let currentPlayerTxt = document.querySelector('.current-player');

    const gameInit = () => {
        let startGameBtn = document.querySelector('.start-game');
        let homeBtn = document.querySelector('.home');
        let restartBtn = document.querySelector('.restart');
        for (let i = 0; i < tagBtns.length; i++) {
            tagBtns[i].addEventListener('click', playerTurn);
        }
        startGameBtn.addEventListener('click', getPlayerNames);
        homeBtn.addEventListener('click', home);
        restartBtn.addEventListener('click', restart);
    };

    const getPlayerNames = () => {
        let name = prompt("Enter player one's name");
        playerOne = Player(name || 'player one', 'X', 'human');
        currentPlayer = playerOne;

        name = prompt("Enter player two's name");
        playerTwo = Player(name || 'player two', 'O', 'human');
        document.querySelector('.first-page').style.display = 'none';
        document.querySelector('.second-page').style.display = 'block';
        document.querySelector('.player-one').textContent = playerOne.name;
        document.querySelector('.player-two').textContent = playerTwo.name;
        currentPlayerTxt.textContent = `${currentPlayer.name}'s turn`;
    };

    const playerTurn = e => {
        count++;
        dataId = e.target.getAttribute('data-id');
        if (count % 2 === 0) {
            e.target.classList.add('text-info');
        } else {
            e.target.classList.add('text-success');
        }
        e.target.textContent = currentPlayer.tag;
        gameArray[dataId] = currentPlayer.tag;
        let gameOutcome = gameWinner();
        if (gameOutcome === null) {
            nextPlayer(e.target);
        } else if (gameOutcome === 'tie') {
            currentPlayerTxt.textContent = "It's a tie";
            return;
        } else {
            currentPlayerTxt.classList.add('text-success');
            currentPlayerTxt.textContent = `${currentPlayer.name} wins!!`;
            return;
        }
    };

    const nextPlayer = element => {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
        currentPlayerTxt.textContent = `${currentPlayer.name}'s turn`;
        removeListener(element);
    };

    const gameWinner = () => {
        let winningLoc = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [0, 4, 8]
        ];
        for (let i = 0; i < winningLoc.length; i++) {
            if (gameArray[winningLoc[i][0]] === '') { continue };
            if (gameArray[winningLoc[i][0]] === gameArray[winningLoc[i][1]] && gameArray[winningLoc[i][0]] === gameArray[winningLoc[i][2]]) {
                for (let i = 0; i < tagBtns.length; i++) {
                    removeListener(tagBtns[i]);
                }
                return currentPlayer;
            }
        }
        if (gameArray.every(elem => elem != '')) {
            return 'tie';
        }
        return null;
    };

    const restart = () => {
        count = 0;
        gameArray = gameArray.fill('');
        currentPlayer = playerOne;
        currentPlayerTxt.classList.remove('text-success');
        currentPlayerTxt.textContent = `${currentPlayer.name}'s turn`;
        for (let i = 0; i < tagBtns.length; i++) {
            tagBtns[i].addEventListener('click', playerTurn);
            tagBtns[i].className = "bg-white tag-btn";
            tagBtns[i].textContent = '';
        }
    };

    const home = () => {
        location.reload();
    };

    const removeListener = elem => {
        elem.removeEventListener('click', playerTurn);
    };

    return { gameInit };
})();

gameFactory.gameInit();