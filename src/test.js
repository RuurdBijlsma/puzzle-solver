import fs from 'fs';

let f = fs.readFileSync('./example.puzzle.json');
let puzzle = JSON.parse(f);

import {solve} from './';

let s = solve(puzzle);
console.log(s);