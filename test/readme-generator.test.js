const inquirer = require('inquirer');
const fs = require('fs');
const READMEGenerator = require('../src/readme-generator.js');

jest.mock('inquirer', () => ({
    prompt: jest.fn()
}));

jest.mock('fs', () => ({
    writeFile: jest.fn()
}));

describe('README Generator', () => {
    beforeAll(() => {
        jest.setTimeout(10000);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should generate the README content', async () => {
        const generator = new READMEGenerator('./test/');
        await generator.generateContent();

        inquirer.prompt.mockResolvedValue({
            description: "This is the test description",
            installation: "This is the test installation",
            usage: "This is the test usage",
            contribution: "This is the test contribution",
            tests: "This is the test tests"
        });

        expect(generator.content).toContain('## Description\nThis is the test description\n');
        expect(generator.content).toContain('## Installation\nThis is the test installation\n');
        expect(generator.content).toContain('## Usage\nThis is the test usage\n');
        expect(generator.content).toContain('## Contribution\nThis is the test contribution\n');
        expect(generator.content).toContain('## Tests\nThis is the test tests\n');
    });

    it("should run and create README file", async () => {
        const generator = new READMEGenerator('./test/');
        const createSpy = jest.spyOn(generator, 'create');
        await generator.run();
        expect(createSpy).toHaveBeenCalled();
    });

    it("should write to the file system", async () => {
        inquirer.prompt.mockResolvedValue({
            description: "This is the test description",
            installation: "This is the test installation",
            usage: "This is the test usage",
            contribution: "This is the test contribution",
            tests: "This is the test tests"
        });

        const generator = new READMEGenerator('./test/');
        await generator.run();
        expect(fs.writeFile).toHaveBeenCalledWith(
            './test/README.md',
            expect.any(String),
            expect.any(Function)
        );
    });
});