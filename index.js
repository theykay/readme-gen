const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// const writeFileAsync = util.promisify(fs.writeFile);

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

// const question1 = [
//     {
//         type: "input",
//         name: "name",
//         message: "What is the name of this project?"
//     }];

const questionMulti = [
    // 0
    {
        type: "input",
        name: "describe",
        message: "Please enter a description of this project"
    },
    // 1
    {
        type: "input",
        name: "install",
        message: "Installation instructions"
    },
    // 2
    {
        type: "input",
        name: "use",
        message: "Instructions and examples for use"
    },
    // 3
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Enter another line?',
        default: false,
    }
];

// const question2 = [
//     // 0
//     {
//         type: "input",
//         name: "image",
//         message: "Filepath to the screenshot (relative to the readme location)"
//     },
//     // 1
//     {
//         type: "input",
//         mame: "imageAlt",
//         message: "Description of screenshot"
//     },
//     // 2
//     {
//         type: "input",
//         name: "contribution",
//         message: "Contribution guidelines"
//     },
//     // 3
//     {
//         type: "input",
//         name: "test",
//         message: "Test instructions"
//     },
//     // 4
//     {
//         type: "input",
//         name: "creator",
//         message: "Name to appear on license"
//     },
//     // 5
//     {
//         type: "list",
//         name: "license",
//         message: "Pick a license to use:",
//         choices: [1, 2, 3, 4, 5, 6]
//     },
//     // 6
//     {
//         type: "input",
//         name: "github",
//         message: "Github username"
//     }
// ];

// inquirer.prompt(question1)
//     .then(multiLine(0, "describe"))
//     .then(multiLine(1, "install"))
//     .then(multiLine(2, "use"))
//     .then(inquirer.prompt(question2));

inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "Name of project"
    }
])

function multi(index, key) {
    let array;
    let answer;
    inquirer.prompt(questionMulti[index]).then((answers) => {
        if (key === "describe") {
            array = multiline.describe;
            answer = answers.description;
        } else if (key === "install") {
            array = multiline.install;
            answer = answers.install;
        } else if (key === "use") {
            array = multiline.use;
            answer = answers.use;
        };
        array.push(answer);
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'askAgain',
                message: 'Enter another line?',
                default: false
            }
        ]).then((ans) => {
            if (ans.askAgain) {
                multi(index, key);
            };
        });
    });
};

const template = `
#${questions.name}

## Description
${multiline.describe.join('\n')}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contribution Guidelines](#contribution-guidelines)
* [Test Instructions](#test-instructions) 
* [License](#license)

## Installation
${multiline.install.join('\n')}

## Usage
${multiline.use.join('\n')}

## License

## Contribution Guidelines
${questions.contribution}

## Test Instructions
${questions.test}

## Questions
Github: [${questions.github}](https://github.com/${questions.github})
`