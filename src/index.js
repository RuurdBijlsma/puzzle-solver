import * as cs from "csp-solver";
import constraintTypes from "./constraintTypes";
import PuzzleConstraint from "./PuzzleConstraint";
import Puzzle from "./Puzzle";

const getConstraints = (puzzle) => {
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

const getCSP = (puzzle, solutions = 1) => {
    let constraints = getConstraints(puzzle);
    return {
        variables: puzzle.domains,
        constraints,
        mrv: true,
        degree: false,
        lcv: false,
        solutions,
    };
}

const solve = (puzzle) => {
    let csp = getCSP(puzzle, 1);
    console.log(csp);
    return cs.solve(csp);
}

const hasUniqueSolution = (puzzle) => {
    let csp = getCSP(puzzle, 'all');
    let result = cs.solve(csp);
    let unique = result.solutions.length === 1;
    return {unique, result};
}

export {getCSP, solve, hasUniqueSolution, getConstraints, PuzzleConstraint, Puzzle};