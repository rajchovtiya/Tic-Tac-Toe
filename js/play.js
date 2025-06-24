function createTicTacToeGrid(gridValue) {
    const board = document.getElementById("game-board");
    let winsymbol = document.querySelector(".win-symbol")
    board.innerHTML = "";

    const size = parseInt(gridValue);
    const symbolLimit = parseInt(localStorage.getItem("Symbols")) || 3;
    const maxMoves = size * size;

    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    let currentPlayer = "X";
    let moveCount = 0;
    let gameEnded = false;

    const boardMatrix = Array.from({ length: size }, () => Array(size).fill(""));
    const cells = [];

    for (let i = 0; i < maxMoves; i++) {
        const row = Math.floor(i / size);
        const col = i % size;

        const cell = document.createElement("div");

        cell.classList.add("cell");
        cell.style.border = "2px solid #ccc";
        cell.style.width = "70px";
        cell.style.height = "70px";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        cell.style.fontSize = "2.5rem";
        cell.style.cursor = "pointer";
        cell.dataset.row = row;
        cell.dataset.col = col;

        cell.addEventListener("click", () => {
            if (cell.textContent === "" && !gameEnded) {
                cell.textContent = currentPlayer;
                cell.style.color = currentPlayer === "X" ? "green" : "red";


                boardMatrix[row][col] = currentPlayer;
                moveCount++;

                const winningCells = checkWin(boardMatrix, row, col, currentPlayer, symbolLimit);

                if (winningCells) {
                    gameEnded = true;
                    localStorage.setItem("winner", currentPlayer);
                    setTimeout(() => {
                        gsap.to(".Covaer_bg", {
                            scale: "1",
                            duration: 1,
                            ease: "none",
                            startAt: { scale: "0" }
                        });
                        if (currentPlayer === 'X') {
                            winsymbol.parentElement.classList.remove("winershow")
                            winsymbol.parentElement.children[0].classList.remove("WINNER")
                            winsymbol.parentElement.children[1].classList.remove("win-symbol")

                            winsymbol.parentElement.classList.add("winershowX2")
                            winsymbol.parentElement.children[0].classList.add("WINNER2")
                            winsymbol.parentElement.children[1].classList.add("win-symbol2")


                        }
                        winsymbol.innerText = currentPlayer
                        gsap.to(".win_main2", {
                            scale: "1",
                            duration: 1,
                            ease: "none",
                            startAt: { scale: "0" }
                        });
                    }, 200)
                    //Highlight win line
                    winningCells.forEach(([r, c]) => {
                        const index = r * size + c;
                        const winCell = cells[index];
                        winCell.style.color = "white";
                        winCell.style.backgroundColor = "#4caf50";
                        winCell.style.border = "2px solid white";
                    });

                    // Disable all clicks
                    cells.forEach(c => c.style.pointerEvents = "none");
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });

        board.appendChild(cell);
        cells.push(cell);
    }
}

function checkWin(board, row, col, player, winLength) {
    return (
        getWinningCells(board, row, col, player, winLength, 0, 1) || // Horizontal
        getWinningCells(board, row, col, player, winLength, 1, 0) || // Vertical
        getWinningCells(board, row, col, player, winLength, 1, 1) || // Diagonal \
        getWinningCells(board, row, col, player, winLength, 1, -1)   // Diagonal /
    );
}

function getWinningCells(board, row, col, player, winLength, dr, dc) {
    let cells = [[row, col]];

    for (let dir = -1; dir <= 1; dir += 2) {
        for (let i = 1; i < winLength; i++) {
            const r = row + dir * dr * i;
            const c = col + dir * dc * i;
            if (board[r] && board[r][c] === player) {
                cells.push([r, c]);
            } else {
                break;
            }
        }
    }

    return cells.length >= winLength ? cells : null;
}



let symblo = document.querySelector(".symblo")
window.addEventListener("DOMContentLoaded", () => {
    const savedGrid = localStorage.getItem("grid");
    let symbolLimit = localStorage.getItem("Symbols")
    symblo.innerText = symbolLimit
    if (savedGrid) {
        createTicTacToeGrid(savedGrid);
    }
});
