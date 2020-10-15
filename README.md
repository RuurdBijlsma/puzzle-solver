# Puzzle Solver
Package for solving puzzles, mainly focuses on sudoku, but other puzzles should also be supported. 

## Solver features
* Solve given puzzle object (see .puzzle.json file format features)
* Check if given puzzle has unique solution
* Check constraints on given puzzle (ex. for when a user has filled in the puzzle)

## `.puzzle.json` File format features
* Many types of constraints to help in creating complex sudoku puzzles
    * All different (ex. regular sudoku rules)
    * Increasing (ex. thermometer)
    * Sums to (ex. cage)
    * King's or knight's move constraint
    * Custom constraints, can be anything
* Includes support for visualizing constraints and different types of puzzles by including background layers
* Pencil marks per cell
* Domain per cell (ex. [1,2,3,4,5,6,7,8,9] for sudoku)
* CSS color per cell

Puzzle should be formatted as follows: 

`example.puzzle.json`

```json
{
    "name": "my sudoku puzle",
    "description": "its 2x2, not very difficult",
    "author": "ruurd bijlsma",
    "createdAt": "2020-10-14T23:05:21.714Z",
    "level": 7,
    "domains": {
        "0,0": [1],
        "1,0": [4,5,6,7,8,9],
        "0,1": [2,3,4,5,6,7,8,9],
        "1,1": [5,6,7,8,9]
    },
    "pencilMarks": {
        "1,1": [1,2,3]
    },
    "colors":{
        "0,0": "red"
    },
    "constraints": [
        {"type": "allDifferent", "name":"Row", "cells": ["0,0", "1,0"]},
        {"type": "allDifferent", "name":"Row", "cells": ["0,1", "1,1"]},
        {"type": "allDifferent", "name":"Column", "cells": ["0,0", "0,1"]},
        {"type": "allDifferent", "name":"Column", "cells": ["1,0", "1,1"]},
        {"type": "increasing", "name":"Thermometer", "cells": ["0,0", "1,0", "1,1"]},
        {"type": "sumsTo", "name":"Cage", "value": 10, "cells": ["1,1", "1,0"]},
        {"type": "custom", "name": "Higher than", "value": 3, "cells": ["1,0"], "constraint": "v => c => c > v"}
    ],
    "backgroundLayers":[
        "sudoku",
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
    ]
}
```