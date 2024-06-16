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
});