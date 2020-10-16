import fs from 'fs';
import Puzzle from "./Puzzle";
import {solve} from './';
import PuzzleConstraint from "./PuzzleConstraint";
import presets from "./presets";

function solveTest() {

    let f = fs.readFileSync('./example.puzzle.json');
    let puzzle = JSON.parse(f);

    let s = solve(puzzle);
    console.log(s);
}


console.log(presets.getSudoku());