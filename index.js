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
}

export default READMEGenerator;