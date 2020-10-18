export default class PuzzleConstraint {
    constructor(name = '', type = '', variables = [], value = null, constraint = null) {
        this.name = name;
        this.type = type;
        this.variables = variables;
        this.value = value;
        this.constraint = constraint;
    }

    toJSON() {
        let obj = {...this};
        if (this.constraint === null)
            delete obj.constraint;
        if (this.value === null)
            delete obj.value;
        return obj;
    }
}