import {Constraint} from "csp-solver";

export default {
    allDifferent(allCells, {cells}) {
        return Constraint.allDifferent(cells);
    },

    allEqual(allCells, {cells}) {
        return Constraint.allEqual(cells);
    },

    increasing(allCells, {cells}) {
        return Constraint.increasing(cells);
    },

    decreasing(allCells, {cells}) {
        return Constraint.decreasing(cells);
    },

    sumsTo(allCells, {cells, value}) {
        switch (cells.length) {
            case 1:
                return [new Constraint(cells, (a) => a === value)];
            case 2:
                return [new Constraint(cells, (a, b) => a + b === value)];
            case 3:
                return [new Constraint(cells, (a, b, c) => a + b + c === value)];
            case 4:
                return [new Constraint(cells, (a, b, c, d) => a + b + c + d === value)];
            case 5:
                return [new Constraint(cells, (a, b, c, d, e) => a + b + c + d + e === value)];
            case 6:
                return [new Constraint(cells, (a, b, c, d, e, f) => a + b + c + d + e + f === value)];
            default:
                return [new Constraint(cells, (...values) => values.reduce((a, b) => a + b === value))];
        }
    },

    subtractTo(allCells, {cells, value}) {
        switch (cells.length) {
            case 1:
                return [new Constraint(cells, (a) => a === value)];
            case 2:
                return [new Constraint(cells, (a, b) => a - b === value)];
            case 3:
                return [new Constraint(cells, (a, b, c) => a - b - c === value)];
            case 4:
                return [new Constraint(cells, (a, b, c, d) => a - b - c - d === value)];
            case 5:
                return [new Constraint(cells, (a, b, c, d, e) => a - b - c - d - e === value)];
            case 6:
                return [new Constraint(cells, (a, b, c, d, e, f) => a - b - c - d - e - f === value)];
            default:
                return [new Constraint(cells, (...values) => values.reduce((a, b) => a - b === value))];
        }
    },

    multiplyTo(allCells, {cells, value}) {
        switch (cells.length) {
            case 1:
                return [new Constraint(cells, (a) => a === value)];
            case 2:
                return [new Constraint(cells, (a, b) => a * b === value)];
            case 3:
                return [new Constraint(cells, (a, b, c) => a * b * c === value)];
            case 4:
                return [new Constraint(cells, (a, b, c, d) => a * b * c * d === value)];
            case 5:
                return [new Constraint(cells, (a, b, c, d, e) => a * b * c * d * e === value)];
            case 6:
                return [new Constraint(cells, (a, b, c, d, e, f) => a * b * c * d * e * f === value)];
            default:
                return [new Constraint(cells, (...values) => values.reduce((a, b) => a * b === value))];
        }
    },

    dividesTo(allCells, {cells, value}) {
        switch (cells.length) {
            case 1:
                return [new Constraint(cells, (a) => a === value)];
            case 2:
                return [new Constraint(cells, (a, b) => a / b === value)];
            case 3:
                return [new Constraint(cells, (a, b, c) => a / b / c === value)];
            case 4:
                return [new Constraint(cells, (a, b, c, d) => a / b / c / d === value)];
            case 5:
                return [new Constraint(cells, (a, b, c, d, e) => a / b / c / d / e === value)];
            case 6:
                return [new Constraint(cells, (a, b, c, d, e, f) => a / b / c / d / e / f === value)];
            default:
                return [new Constraint(cells, (...values) => values.reduce((a, b) => a / b === value))];
        }
    },

    knightsMove(allCells, {}) {
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
        return Constraint.global(allCells, getKnightNeighbours);
    },

    kingsMove(allCells, {}) {
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
        return Constraint.global(allCells, getKingsNeighbours);
    },

    custom(allCells, {cells, value, constraint}) {
        // 👻 🍝
        let isSatisfied = eval(constraint)(value);
        return [new Constraint(cells, isSatisfied)];
    },
}