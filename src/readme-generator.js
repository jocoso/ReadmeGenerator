const inquirer = require('inquirer');
const fs = require('fs');

class READMEGenerator {

    constructor(filepath = './') {
        this.name = filepath + 'README.md';
        this.content = '';
    }


    generateTOC() {
        this.content += '\n\n## Table of Contents\n';
        this.content += '- [Description](#description)\n';
        this.content += '- [Installation](#installation)\n';
        this.content += '- [Usage](#usage)\n';
        this.content += '- [License](#license)\n';
        this.content += '- [Contributors](#contributors)\n';
        this.content += '- [Tests](#tests)\n\n';
    }

    async generateCreditions() {
        let answers = '';
        this.content += '## Credits\n';

        do {
            answers = await inquirer.prompt([
                {
                    name: 'credits',
                    message: 'Who contributed to this project?'
                },
                {
                    name: 'github',
                    message: 'What is their GitHub username?'
                },
                {
                    name: 'email',
                    message: 'What is their email address?'
                },
                {
                    name: 'continue',
                    message: 'Would you like to add another contributor?',
                    type: 'list',
                    choices: ['yes', 'no']
                }
            ]);

            this.content += `\nName: ${answers.credits}\n\n`;
            this.content += `\nGithub: ${answers.github}\n\n`;
            this.content += `\nEmail: ${answers.email}\n\n`;

        } while(answers.continue === 'yes');
    }

    async generateLicense() {
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "license",
                message: "What kind of license should your project have?",
                choices: [
                    "MIT",
                    "BSD 3-Clause",
                    "GNU GPL v3",
                    "Apache 2.0",
                    "Unlicensed"
                ]
            }
        ]);

        this.content += `## License\n ${answers.license}\n`;
        this.addLicenseBadge(answers.license);

    }

    addLicenseBadge(license) {
        switch (license) {
            case "MIT":
                this.content = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)" + this.content;
                break;
            case "BSD 3-Clause":
                this.content = "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)" + this.content;
                break;
            case "GNU GPL v3":
                this.content = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)" + this.content;
                break;
            case "Apache 2.0":
                this.content = "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)" + this.content;
                break;
            default:
                this.content = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)" + this.content;
        }
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
        this.generateTOC();
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
        this.content += `\n\n# ${answers.title}\n`;


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
        await this.generateCreditions();

        this.create();
    }
}

module.exports = READMEGenerator;