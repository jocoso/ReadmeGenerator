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
        jest.setTimeout(10000); // Increase timeout for async operations
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should generate a README title', async () => {
        inquirer.prompt.mockResolvedValueOnce({ title: 'Test Title' });
        const generator = new READMEGenerator();
        await generator.generateTitle();
        expect(generator.content).toContain('# Test Title\n');
    });

    it('should print content', async () => {
        inquirer.prompt.mockResolvedValueOnce({ title: 'Test Title' });
        const generator = new READMEGenerator();
        await generator.generateTitle();
        const content = generator.printContent();
        expect(content).toContain('# Test Title\n');
    });

    it('should run and create README file', async () => {
        inquirer.prompt.mockResolvedValueOnce({ title: 'Test Title' });
        const generator = new READMEGenerator();
        const createSpy = jest.spyOn(generator, 'create');
        await generator.run();
        expect(createSpy).toHaveBeenCalled();
    });

    it('should write to the file system', async () => {
        inquirer.prompt.mockResolvedValueOnce({ title: 'Test Title' });
        const generator = new READMEGenerator("./test/");
        await generator.run();
        expect(fs.writeFile).toHaveBeenCalledWith(
            './test/README.md',
            '# Test Title\n',
            expect.any(Function)
        );
    });
});
