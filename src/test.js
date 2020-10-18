import fs from 'fs';
import Puzzle from "./Puzzle";

function solveTest() {

    let f = fs.readFileSync('./example.puzzle.json');
    let puzzle = Puzzle.fromJSON(f);

    let s = puzzle.solve()
    console.log(s);

    puzzle.hiddenCells = ['1,0']
    console.log(puzzle.visibleCells);
}

// solveTest();
Puzzle.presets.getSudoku(9, 9);
// console.log(Puzzle.constraintTypes);