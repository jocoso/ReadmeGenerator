import inquirer from "inquirer";

class READMEGenerator {
    constructor() {
        this.name = 'README.md';
        this.content = '';
    }

    create() {
        this.content = `# ${this.name}\n`;
        return this.content;
    }

    run() {
        // Ask the user for information
        // call the corresponding function to generate the content
        // When all the information is collected, call the create function to generate the README.md file
    }
}

export default READMEGenerator;