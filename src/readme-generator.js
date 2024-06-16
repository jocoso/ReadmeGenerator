const inquirer = require('inquirer');
const fs = require('fs');

class READMEGenerator {

    constructor(filepath = './') {
        this.name = filepath + 'README.md';
        this.content = '';
    }

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
        await this.generateContent();
        this.create();
    
    }
}

module.exports = READMEGenerator;