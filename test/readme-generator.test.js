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