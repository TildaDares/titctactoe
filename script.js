const Player = (name, tag, type) => {
    return { name, tag, type };
}

const Computer = (name, tag, type) => {
    const otherPlayer = tag === 'X' ? 'O' : 'X';
    const nextMove = () => {
        let move;
        let bestScore = -Infinity;
        board = gameFactory.gameArray;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = tag;
                let score = minimax(board, 0, true);
                // console.log(score)
                board[i] = '';
                if (score > bestScore) {
                    move = i;
                    bestScore = score;
                }
            }
        }
        console.log(move)
        button = document.querySelector(`[data-id="${move}"]`);
        console.log(button)
        button.click();
        return button;
    };

    const minimax = (board, depth, isMaximizing) => {
        gameOutcome = gameFactory.gameWinner();
        if (gameOutcome !== null) {
            if (gameOutcome.tag === tag) {
                return 1;
            } else if (gameOutcome === 'tie') {
                return 0;
            } else {
                return -1;
            }
        }

        if (isMaximizing) {
            let bestScore = -1;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = tag;
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore)
                }
            }
            return bestScore;
        } else {
            let bestScore = 1;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = otherPlayer;
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore)
                }
            }
            return bestScore;
        }
    }
    return { name, tag, type, nextMove }
}
const gameFactory = (() => {
    let playerOne, playerTwo, currentPlayer;
    let count = 0;
    let gameArray = new Array(9).fill('');
    let tagBtns = document.querySelectorAll('.tag-btn')
    let currentPlayerTxt = document.querySelector('.current-player');

    const gameInit = () => {
        console.log('yo')
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
            playerOne = Player(name || 'player one', 'X', 'human');
        } else {
            playerOne = Computer('computer one', 'X', 'computer');
        }
        currentPlayer = playerOne;

        if (selectBtnTwo.value == 1) {
            let name = prompt("Enter player two's name");
            playerTwo = Player(name || 'player two', 'O', 'human');
        } else {
            playerTwo = Computer('computer two', 'O', 'computer');
        }
        document.querySelector('.first-page').style.display = 'none';
        document.querySelector('.second-page').style.display = 'block';
        document.querySelector('.player-one').textContent = playerOne.name;
        document.querySelector('.player-two').textContent = playerTwo.name;
        currentPlayerTxt.textContent = `${currentPlayer.name}'s turn`;
        compPlayer();
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
        compPlayer();
    };

    const compPlayer = () => {
        if (currentPlayer.type === 'computer') {
            currentPlayer.nextMove();
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

    return { gameInit, gameArray, gameWinner };
})();

gameFactory.gameInit();