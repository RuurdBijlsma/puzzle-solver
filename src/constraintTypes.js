import {Constraint} from "csp-solver";

export default {
    allDifferent(allVariables, {variables}) {
        return Constraint.allDifferent(variables);
    },
    allDifferentNAry(allVariables, {variables: variables}) {
        switch (variables.length) {
            case 2:
                return new Constraint(variables, (a, b) => a !== b);
            case 3:
                return new Constraint(variables, (a, b, c) => a !== b && b !== c);
            case 4:
                return new Constraint(variables, (a, b, c, d) => a !== b && b !== c && c !== d);
            case 9:
                return new Constraint(variables,
                    (a, b, c, d, e, f, g, h, i) =>
                        a !== b && b !== c && c !== d && d !== e && e !== f && f !== g && g !== h && h !== i
                );
            default:
                return new Constraint(variables,
                    (...args) => {
                        for (let i = 1; i < args.length; i++)
                            if (args[i - 1] !== args[i])
                                return false;
                        return true;
                    }
                );
        }
    },

    allEqual(allVariables, {variables}) {
        return Constraint.allEqual(variables);
    },

    increasing(allVariables, {variables}) {
        return Constraint.increasing(variables);
    },

    decreasing(allVariables, {variables}) {
        return Constraint.decreasing(variables);
    },

    sumsTo(allVariables, {variables, value}) {
        switch (variables.length) {
            case 1:
                return [new Constraint(variables, (a) => a === value)];
            case 2:
                return [new Constraint(variables, (a, b) => a + b === value)];
            case 3:
                return [new Constraint(variables, (a, b, c) => a + b + c === value)];
            case 4:
                return [new Constraint(variables, (a, b, c, d) => a + b + c + d === value)];
            case 5:
                return [new Constraint(variables, (a, b, c, d, e) => a + b + c + d + e === value)];
            case 6:
                return [new Constraint(variables, (a, b, c, d, e, f) => a + b + c + d + e + f === value)];
            default:
                return [new Constraint(variables, (...values) => values.reduce((a, b) => a + b === value))];
        }
    },

    subtractTo(allVariables, {variables, value}) {
        switch (variables.length) {
            case 1:
                return [new Constraint(variables, (a) => a === value)];
            case 2:
                return [new Constraint(variables, (a, b) => a - b === value)];
            case 3:
                return [new Constraint(variables, (a, b, c) => a - b - c === value)];
            case 4:
                return [new Constraint(variables, (a, b, c, d) => a - b - c - d === value)];
            case 5:
                return [new Constraint(variables, (a, b, c, d, e) => a - b - c - d - e === value)];
            case 6:
                return [new Constraint(variables, (a, b, c, d, e, f) => a - b - c - d - e - f === value)];
            default:
                return [new Constraint(variables, (...values) => values.reduce((a, b) => a - b === value))];
        }
    },

    multiplyTo(allVariables, {variables, value}) {
        switch (variables.length) {
            case 1:
                return [new Constraint(variables, (a) => a === value)];
            case 2:
                return [new Constraint(variables, (a, b) => a * b === value)];
            case 3:
                return [new Constraint(variables, (a, b, c) => a * b * c === value)];
            case 4:
                return [new Constraint(variables, (a, b, c, d) => a * b * c * d === value)];
            case 5:
                return [new Constraint(variables, (a, b, c, d, e) => a * b * c * d * e === value)];
            case 6:
                return [new Constraint(variables, (a, b, c, d, e, f) => a * b * c * d * e * f === value)];
            default:
                return [new Constraint(variables, (...values) => values.reduce((a, b) => a * b === value))];
        }
    },

    dividesTo(allVariables, {variables, value}) {
        switch (variables.length) {
            case 1:
                return [new Constraint(variables, (a) => a === value)];
            case 2:
                return [new Constraint(variables, (a, b) => a / b === value)];
            case 3:
                return [new Constraint(variables, (a, b, c) => a / b / c === value)];
            case 4:
                return [new Constraint(variables, (a, b, c, d) => a / b / c / d === value)];
            case 5:
                return [new Constraint(variables, (a, b, c, d, e) => a / b / c / d / e === value)];
            case 6:
                return [new Constraint(variables, (a, b, c, d, e, f) => a / b / c / d / e / f === value)];
            default:
                return [new Constraint(variables, (...values) => values.reduce((a, b) => a / b === value))];
        }
    },

    knightsMove(allVariables, {}) {
        const getKnightNeighbours = key => {
            let [x, y] = key.split(',').map(n => +n);
            return [
                [x - 2, y - 1],
                [x - 1, y - 2],
                [x + 1, y - 2],
                [x + 2, y - 1],
                [x + 2, y + 1],
                [x + 1, y + 2],
                [x - 1, y + 2],
                [x - 2, y + 1],
            ];
        }
        return Constraint.global(allVariables, getKnightNeighbours);
    },

    kingsMove(allVariables, {}) {
        const getKingsNeighbours = key => {
            let [x, y] = key.split(',').map(n => +n);
            return [
                [x - 1, y - 1],//top left
                [x, y - 1],//top
                [x + 1, y - 1],//top right
                [x + 1, y],//right
                [x + 1, y + 1],//bottom right
                [x, y + 1],//bottom
                [x - 1, y + 1],//bottom left
                [x - 1, y],//left
            ];
        }
        return Constraint.global(allVariables, getKingsNeighbours);
    },

    custom(allVariables, {variables, value, constraint}) {
        // 👻 🍝
        let isSatisfied = eval(constraint)(value);
        return [new Constraint(variables, isSatisfied)];
    },
}