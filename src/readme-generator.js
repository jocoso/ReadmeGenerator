const inquirer = require('inquirer');
const fs = require('fs');

class READMEGenerator {

    constructor(filepath = './') {
        this.name = filepath + 'README.md';
        this.content = '';
    }

    async generateLicense() {
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "license",
                message: "What kind of license should your project have?",
                choices: [
                    "MIT",
                    "OPEN BSD",
                    "NPM PACKAGES",
                    "APACHE 2.0"
                ]
            }
        ]);

        this.content += `## License\n ${answers.license}\n`;

    async generateContent() {
        const answers = await inquirer.prompt([
            {
                name: 'description',
                message: "What is the description of your project?"
            },
            {
                name: 'installation',
                message: "What are the steps required to install your project?"
            },
            {
                name: 'usage',
                message: "Provide instructions and examples for use."
            },
            {
                name: 'contribution',
                message: "Provide guidelines for contributing to the project."
            },
            {
                name: 'tests',
                message: "Provide examples on how to run tests."
            }
        ]);

        this.content += `## Description\n${answers.description}\n`;
        this.content += `## Installation\n${answers.installation}\n`;
        this.content += `## Usage\n${answers.usage}\n`;
        this.content += `## Contribution\n${answers.contribution}\n`;
        this.content += `## Tests\n${answers.tests}\n`;
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

    create() {
        fs.writeFile(this.name, this.content, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file has been saved!');
        });
    }

    async run() {
        // Ask the user for information
        // call the corresponding function to generate the content
        // When all the information is collected, call the create function to generate the README.md file
        await this.generateTitle();
        await this.generateContent();
        await this.generateLicense();

        this.create();
    }
}

module.exports = READMEGenerator;