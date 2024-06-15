const inquirer = require('inquirer');
const fs = require('fs');

class READMEGenerator {

    constructor(filepath = './') {
        this.name = filepath + 'README.md';
        this.content = '';
    }

    async generateTitle() {
        // Ask user for title
        // Add h1 title to content
        const answer = await inquirer.prompt([
            {
                name: 'title',
                message: "What is the title of your project?"
            }
        ]);

        this.content = `# ${answer.title}\n`;
    }

    printContent() {
        console.log(this.content);
        return this.content;
    }

    create() {
        fs.writeFile(this.name, this.content, (err) => {
            if(err) {
                return console.log(err);
            }

            console.log('The file has been saved!');
        });
    }

    async run() {
        // Ask the user for information
        await this.generateTitle();
        this.printContent();
        this.create();
        // call the corresponding function to generate the content
        // When all the information is collected, call the create function to generate the README.md file
    }
}

module.exports = READMEGenerator;