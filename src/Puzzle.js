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

        this._allConstraintsCache = null
        this._usableConstraintsCache = null
    }

    addConstraint(constraint) {
        this._allConstraintsCache = null;
        this._usableConstraintsCache = null;
        this.constraints.push(constraint);
    }

    removeConstraint(constraint) {
        let index = this.constraints.indexOf(constraint);
        if (index === -1)
            return false;
        this._allConstraintsCache = null;
        this._usableConstraintsCache = null;
        this.constraints.splice(index, 1);
        return true;
    }

    get constraintGroups() {
        let groups = {};

        for (let constraint of this.constraints) {
            if (constraint.group === null) {
                if (!groups.constraints)
                    groups.constraints = [];
                groups.constraints.push(constraint);
                continue;
            }

            let groupStructure = constraint.group.split('/');

            let currentGroup = groups;
            for (let i = 0; i < groupStructure.length; i++) {
                let key = groupStructure[i];
                let isFinalKey = i === groupStructure.length - 1;

                if (currentGroup[key] === undefined)
                    currentGroup[key] = {};
                if (isFinalKey && currentGroup[key].constraints === undefined)
                    currentGroup[key].constraints = [];
                if (isFinalKey)
                    currentGroup[key].constraints.push(constraint)

                currentGroup = currentGroup[key];
            }
        }

        return groups;
    }

    get visibleCells() {
        return Object.keys(this.domains).filter(c => !this.hiddenCells.includes(c));
    }

    get usableConstraints() {
        if (!this._usableConstraintsCache) {
            let goodConstraints = [];
            let otherConstraints = [];
            this.constraints.forEach(constraint => {
                if (constraint.variables.length > 0)
                    goodConstraints.push(constraint)
                else
                    otherConstraints.push(constraint);
            });
            this._usableConstraintsCache = [...goodConstraints, ...this._processConstraints(otherConstraints)];
        }
        return this._usableConstraintsCache;
    }

    get allConstraints() {
        if (!this._allConstraintsCache) {
            this._allConstraintsCache = this._processConstraints(this.constraints);
        }
        return this._allConstraintsCache;
    }

    _processConstraints(constraints) {
        let processed = [];
        for (let c of constraints) {
            if (constraintTypes.hasOwnProperty(c.type)) {
                processed.push(...constraintTypes[c.type].constraint(this.domains, c));
            } else {
                console.warn("Constraint", c, "was ignored, it's not supported");
            }
        }
        return processed;
    }

    getCSP(solutions = 1) {
        return {
            variables: {...this.domains},
            constraints: this.allConstraints,
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

    copy() {
        let json = JSON.stringify({...this, _usableConstraintsCache: null, _allConstraintsCache: null});
        return Puzzle.fromJSON(json);
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