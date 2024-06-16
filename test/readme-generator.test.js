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
    
    it('should generate the README license', async () => {
        const generator = new READMEGenerator('./test/');
        await generator.run();
        expect(fs.writeFile).toHaveBeenCalledWith(
            './test/README.md',
            expect.stringContaining('## License\n MIT\n'),
            expect.any(Function)
        )
    })
});