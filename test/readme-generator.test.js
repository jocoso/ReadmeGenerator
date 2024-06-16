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
        inquirer.prompt.mockResolvedValue({
            license: "MIT"
        });
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

            expect.stringContaining('## License\n MIT\n'),
            expect.any(Function)
            )
    });

    it("should generate the README credits", async () => {
        
        inquirer.prompt.mockResolvedValueOnce({
            credits: "John Doe",
            github: "johndoe",
            email: "john@example.com",
            continue: "no"
        });

        const generator = new READMEGenerator();
        await generator.run();
        expect(fs.writeFile).toHaveBeenCalledWith(
            "./README.md",
            expect.stringContaining("## Credits\nName: John Doe\nGithub: johndoe\nEmail john@example.com\n\n"),
            expect.any(Function)
        );
    });

    it("should generate credits content correctly for multiple contributors", async () => {
        inquirer.prompt
            .mockResolvedValueOnce({
                credits: "John Doe",
                github: "johndoe",
                email: "john@example.com",
                continue: "yes"
            })
            .mockResolvedValueOnce({
                credits: "Jane Doe",
                github: "janedoe",
                email: "jane@example.com",
                continue: "no"
            });

        const generator = new READMEGenerator('./test/');
        await generator.generateCreditions();

        expect(generator.content).toContain("## Credits\n");
        expect(generator.content).toContain("Name: John Doe\nGithub: johndoe\nEmail john@example.com\n\n");
        expect(generator.content).toContain("Name: Jane Doe\nGithub: janedoe\nEmail jane@example.com\n\n");
    });

    it("should call fs.writeFile with correct arguments when create is called", async () => {
        const generator = new READMEGenerator();
        generator.content = "Sample content";
        generator.create();
        expect(fs.writeFile).toHaveBeenCalledWith(
            "./README.md",
            "Sample content",
            expect.any(Function)
        );
    });

    it("should run the generateCreditions and create methods when run is called", async () => {
        inquirer.prompt.mockResolvedValueOnce({
            credits: "John Doe",
            github: "johndoe",
            email: "john@example.com",
            continue: "no"
        });
        
        const generator = new READMEGenerator();
        const generateCreditionsSpy = jest.spyOn(generator, "generateCreditions");
        const createSpy = jest.spyOn(generator, 'create');

        await generator.run();

        expect(generateCreditionsSpy).toHaveBeenCalled();
        expect(createSpy).toHaveBeenCalled();
    });

    it("should generate the README Table of Contents", () => {
        const generator = new READMEGenerator("./test/");
        generator.generateTOC();
        expect(generator.content).toContain('## Table of Contents\n');
        expect(generator.content).toContain('- [Description](#description)\n');
        expect(generator.content).toContain('- [Installation](#installation)\n');
        expect(generator.content).toContain('- [Usage](#usage)\n');
        expect(generator.content).toContain('- [License](#license)\n');
        expect(generator.content).toContain('- [Contributors](#contributors)\n');
        expect(generator.content).toContain('- [Tests](#tests)\n');
    });

    it("should call fs.writeFile with correct arguments when create is called", () => {
        const generator = new READMEGenerator();
        generator.content = "Sample content";
        generator.create();
        expect(fs.writeFile).toHaveBeenCalledWith(
            "./README.md",
            "Sample content",
            expect.any(Function)
        );
    });

    it("should run the generateTOC and create methods when run is called", async () => {
        const generator = new READMEGenerator();
        const generateTOCSpy = jest.spyOn(generator, "generateTOC");
        const createSpy = jest.spyOn(generator, "create");

        await generator.run();

        expect(generateTOCSpy).toHaveBeenCalled();
        expect(createSpy).toHaveBeenCalled();
    });
});