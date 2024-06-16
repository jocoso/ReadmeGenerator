const inquirer = require('inquirer');
const fs = require('fs');

class READMEGenerator {

    constructor(filepath = './') {
        this.name = filepath + 'README.md';
        this.content = '';
    }

    async generateTitle() {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the title of your project?"
            }
        ]);
        this.content += `# ${answers.title}\n`;
    }

    create() {
        fs.writeFile(this.name, this.content, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file has been saved!');
        });
    }

    async run() {
        await this.generateTitle();
        this.create();
    }
}

module.exports = READMEGenerator;