const inquirer = require('inquirer');
const fs = require('fs');

class READMEGenerator {

    constructor(filepath = './') {
        this.name = filepath + 'README.md';
        this.content = '';
    }

    create() {

    }

    async run() {
        // Ask the user for information
        // call the corresponding function to generate the content
        // When all the information is collected, call the create function to generate the README.md file
        const READMEGenerator = require('./src/readme-generator.js');
        const generator = new READMEGenerator("./test/");
        
        generator.run();
    }
}

module.exports = READMEGenerator;