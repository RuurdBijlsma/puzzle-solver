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
}