const inquirer = require('inquirer');

class READMEGenerator {
    constructor() {
        this.name = 'README.md';
        this.content = '';
    }

    generateTitle() {
        // Ask user for title
        // Add h1 title to content
        inquirer.prompt([
            {
                name: 'title',
                message: "What is the title of your project?"
            },
        ]).then(answers => {
            this.content += `# ${answers.title}\n`;
        });
    }

    create() {
        // create
    }

    run() {
        // call the corresponding function to generate the content
        // When all the information is collected, call the create function to generate the README.md file
    }
}

export default READMEGenerator;