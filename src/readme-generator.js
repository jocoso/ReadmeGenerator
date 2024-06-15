const inquirer = require('inquirer');
const fs = require('fs');

class READMEGenerator {
    constructor(filepath = './') {
        this.name = `${filepath}README.md`;
        this.content = '';
    }

    async generateTitle() {
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
            if (err) {
                return console.log(err);
            }
            console.log('The file has been saved!');
        });
    }

    async run() {
        await this.generateTitle();
        this.printContent();
        this.create();
    }
}

module.exports = READMEGenerator;
