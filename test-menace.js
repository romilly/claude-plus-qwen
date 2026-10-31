// Simple test to verify MENACE logic is working
const state = {
    board: [null, null, null, null, null, null, null, null, null],
    currentPlayer: 'X',
    gameActive: true,
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    matchboxes: {},
    beadCounts: {}
};

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

function getPossibleMoves(board) {
    return board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
}

function getBoardKey(board) {
    return board.join('');
}

function getBeadsForPosition(position, board) {
    const key = getBoardKey(board);
    if (!state.matchboxes[key]) {
        state.matchboxes[key] = [];
        state.beadCounts[key] = 0;

        // Initialize with default beads (3 red, 3 blue, 3 green for each position)
        const possibleMoves = getPossibleMoves(board);
        for (let i = 0; i < possibleMoves.length; i++) {
            const move = possibleMoves[i];
            if (i === 0) {
                state.matchboxes[key].push({move: move, color: 'red'});
            } else if (i === 1) {
                state.matchboxes[key].push({move: move, color: 'blue'});
            } else if (i === 2) {
                state.matchboxes[key].push({move: move, color: 'green'});
            } else {
                // Add more beads for other moves if needed
                state.matchboxes[key].push({move: move, color: 'yellow'});
            }
        }
        state.beadCounts[key] = possibleMoves.length;
    }

    return state.matchboxes[key];
}

function menaceMove() {
    const possibleMoves = getPossibleMoves(state.board);

    console.log('Possible moves:', possibleMoves);

    if (possibleMoves.length === 0) {
        return null; // No moves left
    }

    // Get the beads for current board state
    const key = getBoardKey(state.board);
    const beads = state.matchboxes[key] || [];

    console.log(`Board state: ${state.board}`);
    console.log(`Matchbox key: ${key}`);
    console.log(`Beads available: ${beads.length}`);

    // Randomly select a bead from available beads
    if (beads.length > 0) {
        const randomIndex = Math.floor(Math.random() * beads.length);
        const selectedMove = beads[randomIndex].move;

        console.log(`Selected move from beads: ${selectedMove}`);

        // Update board with MENACE's move
        state.board[selectedMove] = 'O';
        return selectedMove;
    }

    // Fallback: choose a random available move
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const fallbackMove = possibleMoves[randomIndex];
    state.board[fallbackMove] = 'O';
    console.log(`Fallback move: ${fallbackMove}`);
    return fallbackMove;
}

// Test the function
console.log('Testing MENACE move selection...');

// Initialize a simple board state
state.board = ['X', null, null, null, null, null, null, null, null];
console.log('Initial board:', state.board);

const move = menaceMove();
console.log('MENACE selected move:', move);
console.log('Board after move:', state.board);