import fs from 'fs';
import Puzzle from "./Puzzle";
import {PuzzleConstraint} from "./index";

function solveTest() {

    let f = fs.readFileSync('./example.puzzle.json');
    let puzzle = Puzzle.fromJSON(f);

    let s = puzzle.solve()
    console.log(s);

    puzzle.hiddenCells = ['1,0']
    console.log(puzzle.visibleCells);
}

// solveTest();
let s = Puzzle.presets.getSudoku(9, 9);
s.addConstraint(new PuzzleConstraint('Knights move', 'knightsMove'));
console.log(s.getConstraints()[0]);
console.log(s.getConstraints()[0]);
// console.log(Puzzle.constraintTypes);