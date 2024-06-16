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
        await this.generateLicense();
        this.create();
    }
}

module.exports = READMEGenerator;