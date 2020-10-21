export default class PuzzleConstraint {
    constructor({
                    name = '',
                    type = '',
                    variables = [],
                    value = null,
                    constraint = null,
                    group = null,
                }) {
        this.name = name;
        this.type = type;
        this.variables = variables;
        this.value = value;
        this.constraint = constraint;
        this.group = group;
    }

    toJSON() {
        let obj = {...this};
        if (this.constraint === null)
            delete obj.constraint;
        if (this.value === null)
            delete obj.value;
        if (this.group === null)
            delete obj.group;
        return obj;
    }
}