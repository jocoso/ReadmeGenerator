jest.mock('inquirer', () => ({
    prompt: jest.fn().mockResolvedValue({ title: 'Test Project' })
}));

jest.mock('fs', () => ({
    writeFile: jest.fn((path, data, callback) => callback(null))
}));

const READMEGenerator = require('../src/readme-generator');

describe("README Generator", () => {
    beforeAll(() => {
        jest.setTimeout(10000); // Increase the timeout to async operations
    });

    it("Should generate a README Title", async () => {
        const generator = new READMEGenerator();
        await generator.generateTitle();
        expect(generator.content).toContain("# Test Project\n");
    });

    it("Should print content", async () => {
        const generator = new READMEGenerator();
        await generator.generateTitle();
        const content = generator.printContent();
        expect(content).toContain("# Test Project\n");
    });

    it("Should run and create README file", async () => {
        const generator = new READMEGenerator();
        const createSpy = jest.spyOn(generator, 'create');
        await generator.run();
        expect(createSpy).toHaveBeenCalled();
    });

    it("should write to the file system", async () => {
        const generator = new READMEGenerator();
        await generator.run();
        expect(require('fs').writeFile).toHaveBeenCalledWith(
            './README.md',
            "# Test Project\n",
            expect.any(Function)
        );
    })
});