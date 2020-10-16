import fs from 'fs';
import Puzzle from "./Puzzle";
import presets from "./presets";

function solveTest() {

    let f = fs.readFileSync('./example.puzzle.json');
    let puzzle = Puzzle.fromJSON(f);

    let s = puzzle.solve()
    console.log(s);
}
// solveTest();
console.log(Puzzle.presets);