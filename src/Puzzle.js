import constraintTypes from "./constraintTypes";
import * as cs from "csp-solver";
import presets from "./presets";

export default class Puzzle {
    constructor() {
        this.domains = [];
        this.name = '';
        this.description = '';
        this.author = '';
        this.createdAt = new Date;
        this.level = 0;
        this.domains = {};
        this.pencilMarks = {};
        this.colors = {};
        this.constraints = [];
        this.backgroundLayers = [];
    }

    getConstraints(puzzle) {
        let constraints = [];
        for (let c of puzzle.constraints) {
            if (constraintTypes.hasOwnProperty(c.type)) {
                constraints.push(...constraintTypes[c.type](puzzle.domain, c));
            } else {
                console.warn("Constraint", c, "was ignored, it's not supported");
            }
        }
        return constraints;
    }

    getCSP(puzzle, solutions = 1) {
        let constraints = this.getConstraints(puzzle);
        return {
            variables: puzzle.domains,
            constraints,
            mrv: true,
            degree: false,
            lcv: false,
            solutions,
        };
    }

    solve(puzzle) {
        let csp = this.getCSP(puzzle, 1);
        return cs.solve(csp);
    }

    hasUniqueSolution(puzzle) {
        let csp = this.getCSP(puzzle, 'all');
        let result = cs.solve(csp);
        let unique = result.solutions.length === 1;
        return {unique, result};
    }

    static presets() {
        return presets;
    }

    static fromJSON(obj) {
        if (typeof obj === 'string')
            obj = JSON.parse(obj);
        let puzzle = new Puzzle();
        for (let key in obj)
            if (obj.hasOwnProperty(key))
                puzzle[key] = obj[key];
        return puzzle;
    }
}