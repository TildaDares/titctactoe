const Player = (name, tag) => {
    return { name, tag };
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
        let selectBtnOne = document.querySelector('.select-btn-1');
        let selectBtnTwo = document.querySelector('.select-btn-2');
        if (selectBtnOne.value == 1) {
            let name = prompt("Enter player one's name");
            playerOne = Player(name || 'player one', 'X');
            currentPlayer = playerOne;
        }
        if (selectBtnTwo.value == 1) {
            let name = prompt("Enter player two's name");
            playerTwo = Player(name || 'player two', 'O');
        }
        document.querySelector('.first-page').style.display = 'none';
        document.querySelector('.second-page').style.display = 'block';
        document.querySelector('.player-one').textContent = playerOne.name;
        document.querySelector('.player-two').textContent = playerTwo.name;
        currentPlayerTxt.textContent = `${currentPlayer.name}'s turn`;
    };

    const playerTurn = e => {
        count++;
        dataId = e.target.getAttribute('data-id');
        if (count % 2 == 0) {
            e.target.classList.add('text-info');
        } else {
            e.target.classList.add('text-success');
        }
        e.target.textContent = currentPlayer.tag;
        gameArray[dataId] = currentPlayer.tag;
        if (gameWinner()) { return };
        currentPlayer = nextPlayer();
        currentPlayerTxt.textContent = `${currentPlayer.name}'s turn`;
        removeListener(e.target);
    };

    const nextPlayer = () => {
        if (currentPlayer === playerOne) {
            return playerTwo;
        } else {
            return playerOne;
        }
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
                currentPlayerTxt.classList.add('text-danger');
                currentPlayerTxt.textContent = `${currentPlayer.name}'s wins!!`;
                for (let i = 0; i < tagBtns.length; i++) {
                    removeListener(tagBtns[i]);
                }
                return true;
            }
        }
        if (gameArray.every(elem => elem != '')) {
            currentPlayerTxt.textContent = "It's a tie";
            return true;
        }
        return false;
    };

    const restart = () => {
        gameArray = gameArray.fill('');
        for (let i = 0; i < tagBtns.length; i++) {
            tagBtns[i].addEventListener('click', playerTurn);
            tagBtns[i].textContent = '';
        }
    };

    const home = () => {
        location.reload();
    };

    const removeListener = elem => {
        elem.removeEventListener('click', playerTurn);
    };

    return { gameInit, gameArray, gameWinner };
})();

gameFactory.gameInit();