const Player = (name, tag) => {
    return { name, tag };
}

const gameFactory = (() => {
    let playerOne, playerTwo;
    let count = 0;
    const getPlayerNames = () => {
        let selectBtnOne = document.querySelector('.select-btn-1');
        let selectBtnTwo = document.querySelector('.select-btn-2');
        if (selectBtnOne.value == 1) {
            let name = prompt("Enter player one's name");
            playerOne = Player(name || 'player one', 'X');
        }
        if (selectBtnTwo.value == 1) {
            let name = prompt("Enter player two's name");
            playerTwo = Player(name || 'player two', 'O');
        }
        document.querySelector('.first-page').style.display = 'none';
        document.querySelector('.second-page').style.display = 'block';
        document.querySelector('.player-one').textContent = playerOne.name;
        document.querySelector('.player-two').textContent = playerTwo.name;
        document.querySelector('.current-player').textContent = `${playerOne.name}'s turn`;
    };

    const playerTurn = e => {
        count++;
        if (count % 2 == 0) {
            e.target.textContent = playerTwo.tag;
            e.target.classList.add('text-info');
            document.querySelector('.current-player').textContent = `${playerOne.name}'s turn`;
        } else {
            e.target.textContent = playerOne.tag;
            e.target.classList.add('text-success');
            document.querySelector('.current-player').textContent = `${playerTwo.name}'s turn`;
        }
        removeListener(e);
    };

    const removeListener = e => {
        e.target.removeEventListener('click', playerTurn);
    };
    return { getPlayerNames, playerTurn };
})();

(function() {
    let startGameBtn = document.querySelector('.start-game');
    let tagBtns = document.querySelectorAll('.tag-btn');
    for (let i = 0; i < tagBtns.length; i++) {
        tagBtns[i].addEventListener('click', gameFactory.playerTurn)
    }
    startGameBtn.addEventListener('click', gameFactory.getPlayerNames);
})();