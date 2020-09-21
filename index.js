const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const multiline = {
    describe: [],
    install: [],
    use: []
}

// // const licenses = {
// //     gnuA3: ,
// //     gnuG3: ,
// //     gnuL3: ,
// //     mozilla: ,
// //     apache: ,
// //     mit: ,
// //     boost: ,
// //     unlicense: 
// // }

const questions = [
    // 0
    {
        type: "input",
        name: "name",
        message: "Name of project",
        default: "name"
    },
    // 1
    {
        type: "input",
        name: "describe",
        message: "Description of project",
        default: "description"
    },
    // 2
    {
        type: "input",
        name: "install",
        message: "Installation instructions",
        default: "installation instructions"
    },
    // 3
    {
        type: "input",
        name: "use",
        message: "Instructions and examples for use",
        default: "Instructions and examples for use"
    },
    // 4
    {
        type: "input",
        name: "image",
        message: "screenshot doc name (with filepath relative to readme)",
        default: "Image-path"
    },
    // 5
    {
        type: "input",
        name: "imageAlt",
        message: "Description of screenshot",
        default: "image alt"
    },
    // 6
    {
        type: "input",
        name: "contribution",
        message: "Contribution guidelines",
        default: "contribution guidelines"
    },
    // 7
    {
        type: "input",
        name: "test",
        message: "Test instructions",
        default: "test instructions"
    },
    // 8
    {
        type: "input",
        name: "creator",
        message: "Name to appear on license",
        default: "name on license"
    },
    // 9
    {
        type: "list",
        name: "license",
        message: "Pick a license to use:",
        choices: [1, 2, 3, 4, 5, 6],
        default: 1
    },
    // 10
    {
        type: "input",
        name: "github",
        message: "Github username",
        default: "github"
    },
    // 11
    {
        type: "input",
        name: "email",
        message: "Email address",
        default: "address@mail.com"
    }
];

inquirer
.prompt(questions)
.then((answers) => {
    const template = `# ${answers.name}

## Description
![${answers.imageAlt}](${answers.image})
${answers.describe}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contribution Guidelines](#contribution-guidelines)
* [Test Instructions](#test-instructions) 
* [License](#license)

## Installation
${answers.install}

## Usage
${answers.use}

## License

## Contribution Guidelines
${answers.contribution}

## Test Instructions
${answers.test}

## answers
Github: [${answers.github}](https://github.com/${answers.github})
Email: [${answers.email}](mailto:${answers.email})
`
    writeFileAsync("readme.md", template);
})