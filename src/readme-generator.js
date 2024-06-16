const inquirer = require('inquirer');
const fs = require('fs');

class READMEGenerator {

    constructor(filepath = './') {
        this.name = filepath + 'README.md';
        this.content = '';
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

            this.content += `Name: ${answers.credits}\n`;
            this.content += `Github: ${answers.github}\n`;
            this.content += `Email: ${answers.email}\n\n`;

        } while(answers.continue === 'yes');

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
        await this.generateCreditions();
        this.create();
    }
}

module.exports = READMEGenerator;