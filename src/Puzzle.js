import constraintTypes from "./constraintTypes";
import * as cs from "csp-solver";
import presets from "./presets";

export default class Puzzle {
    constructor() {
        this.name = '';
        this.description = '';
        this.author = '';
        this.createdAt = new Date;
        this.level = 0;
        this.domains = {};
        this.pencilMarks = {};
        this.colors = {};
        this.constraints = [];
        this.hiddenCells = [];
        this.backgroundLayers = [];
    }

    get visibleCells() {
        return Object.keys(this.domains).filter(c => !this.hiddenCells.includes(c));
    }

    getConstraints() {
        let constraints = [];
        for (let c of this.constraints) {
            if (constraintTypes.hasOwnProperty(c.type)) {
                constraints.push(...constraintTypes[c.type](this.domains, c));
            } else {
                console.warn("Constraint", c, "was ignored, it's not supported");
            }
        }
        return constraints;
    }

    getCSP(solutions = 1) {
        let constraints = this.getConstraints();
        return {
            variables: {...this.domains},
            constraints,
            mrv: true,
            degree: false,
            lcv: false,
            solutions,
        };
    }

    solve(solutions = 1) {
        let csp = this.getCSP(solutions);
        return cs.solve(csp);
    }

    hasUniqueSolution() {
        let csp = this.getCSP('all');
        let result = cs.solve(csp);
        let unique = result.solutions.length === 1;
        return {unique, result};
    }

    static get presets() {
        return presets;
    }

    static get constraintTypes() {
        return constraintTypes;
    }

    static fromJSON(obj) {
        if (typeof obj === 'string' || obj instanceof Buffer)
            obj = JSON.parse(obj);
        let puzzle = new Puzzle();
        for (let key in obj)
            if (obj.hasOwnProperty(key))
                puzzle[key] = obj[key];
        return puzzle;
    }
}