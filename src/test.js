import fs from 'fs';
import Puzzle from "./Puzzle";
import {PuzzleConstraint} from "./index";

function solveTest() {

    let f = fs.readFileSync('./example.puzzle.json');
    let puzzle = Puzzle.fromJSON(f);

    let s = puzzle.solve()
    console.log(s);
}



solveTest();
let s = Puzzle.presets.getSudoku(9, 9);
s.addConstraint(new PuzzleConstraint({
    name: 'Knights move',
    type: 'knightsMove'
}));
console.log(s.constraintGroups);