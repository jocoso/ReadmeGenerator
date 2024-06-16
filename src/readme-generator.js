const inquirer = require('inquirer');
const fs = require('fs');

class READMEGenerator {

    constructor(filepath = './') {
        this.name = filepath + 'README.md';
        this.content = '';
    }

    generateTOC() {
        this.content += '## Table of Contents\n';
        this.content += '- [Description](#description)\n';
        this.content += '- [Installation](#installation)\n';
        this.content += '- [Usage](#usage)\n';
        this.content += '- [License](#license)\n';
        this.content += '- [Contributors](#contributors)\n';
        this.content += '- [Tests](#tests)\n';
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
        this.generateTOC();
        this.create();
    }
}

module.exports = READMEGenerator;