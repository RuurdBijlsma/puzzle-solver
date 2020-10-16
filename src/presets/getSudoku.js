import PuzzleConstraint from "../PuzzleConstraint";
import Puzzle from "../Puzzle";

export default function getSudoku(
    width = 9,
    height = 9,
    blockSize = Math.sqrt(Math.max(width, height)),
    defaultDomain = [1, 2, 3, 4, 5, 6, 7, 8, 9],
) {
    function* getColumn(x) {
        for (let y = 0; y < height; y++)
            yield [x, y];
    }

    function* getRow(y) {
        for (let x = 0; x < width; x++)
            yield [x, y];
    }

    function* getBlock(i) {
        let offset = {
            x: (i * blockSize) % width,
            y: Math.floor(i * blockSize / width),
        };
        for (let x = 0; x < blockSize; x++)
            for (let y = 0; y < blockSize; y++)
                yield [x + offset.x, y + offset.y];
    }

    let constraints = [];
    // blockSize must be an integer for blocks to work
    let blocks = Math.floor(blockSize) === blockSize;
    // Both height and width must be divisible by blockSize
    if (Math.floor(width / blockSize) !== width / blockSize)
        blocks = false;
    if (Math.floor(height / blockSize) !== height / blockSize)
        blocks = false;

    for (let x = 0; x < width; x++)
        constraints.push(new PuzzleConstraint(
            `Column ${x + 1}`,
            'allDifferent',
            [...getColumn(x)],
        ));
    for (let y = 0; y < height; y++)
        constraints.push(new PuzzleConstraint(
            `Row ${y + 1}`,
            'allDifferent',
            [...getRow(y)],
        ));
    if (blocks) {
        let blockCount = (width / blockSize) * (height / blockSize);
        for (let i = 0; i < blockCount; i++)
            constraints.push(new PuzzleConstraint(
                `Block ${i + 1}`,
                'allDifferent',
                [...getBlock(i)],
            ));
    }

    let domains = {};
    for (let x = 0; x < width; x++)
        for (let y = 0; y < height; y++)
            domains[[x, y]] = [...defaultDomain];

    let backgroundLayers = ['grid', 'sudokuBoxes'];

    let puzzle = new Puzzle();
    puzzle.domains = domains;
    puzzle.constraints = constraints;
    puzzle.backgroundLayers = backgroundLayers;

    return puzzle;
}