const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const multiline = {
    describe: [],
    install: [],
    use: []
}

// const blurbs = {
//     gnuA3: ,
//     gnuG3: ,
//     gnuL3: ,
//     mozilla: ,
//     apache: ,
//     mit: ,
//     boost: ,
//     unlicense: 
// };

const badges = {
    mit: `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`,
    gnuA3: `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)`,
    gnuG3: `[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)`,
    gnuL3: `[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](http://www.gnu.org/licenses/lgpl-3.0)`,
    mozilla: `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`,
    apache: `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`,
    boost: `[![License: Boost](https://img.shields.io/badge/License-Boost-blueviolet.svg)](https://www.boost.org/LICENSE_1_0.txt)`,
    unlicense: `[![License: Unlicense](https://img.shields.io/badge/License-Unlicense-green.svg)](https://unlicense.org/)`
};

const year = today.getFullYear();
let name;

const licenses = {
    mit: `MIT License

Copyright (c) ${year} ${name}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    gnuA3: "GNUAGPLv3.txt",
    gnuG3: "GNUGPLv3.txt",
    gnuL3: "GNULGPLv3.txt",
    mozilla: "Mozilla.txt",
    apache: "Apache2.txt",
    boost: "Boost.txt",
    unlicense: "Unlicense.txt"
}



const questions = [
    // 0
    {
        type: "input",
        name: "creator",
        message: "Your name",
        default: "Who made this"
    },
    // 1
    {
        type: "input",
        name: "name",
        message: "Name of project",
        default: "name"
    },
    // 2
    {
        type: "input",
        name: "describe",
        message: "Description of project",
        default: "description"
    },
    // 3
    {
        type: "input",
        name: "install",
        message: "Installation instructions",
        default: "installation instructions"
    },
    // 4
    {
        type: "input",
        name: "use",
        message: "Instructions and examples for use",
        default: "Instructions and examples for use"
    },
    // 5
    {
        type: "input",
        name: "image",
        message: "screenshot doc name (with filepath relative to readme)",
        default: "Image-path"
    },
    // 6
    {
        type: "input",
        name: "imageAlt",
        message: "Description of screenshot",
        default: "image alt"
    },
    // 7
    {
        type: "input",
        name: "contribution",
        message: "Contribution guidelines",
        default: "contribution guidelines"
    },
    // 8
    {
        type: "input",
        name: "test",
        message: "Test instructions",
        default: "test instructions"
    },
    // 9
    {
        type: "input",
        name: "creator",
        message: "Name to appear on license",
        default: "name on license"
    },
    // 10
    {
        type: "list",
        name: "license",
        message: "Pick a license to use:",
        choices: ["MIT", "GNU AGPLv3", "GNU GPLv3", "GNU LGPLv3", "Mozilla Public License 2.0", "Apache License 2.0", "Boost Software License 1.0", "The Unclicense"]
    },
    // 11
    {
        type: "input",
        name: "github",
        message: "Github username",
        default: "github"
    },
    // 12
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
    fs.mkdir("./package");
    name = answers.creator;
    multiline.install.push(answers.install);
    multiline.describe.push(answers.describe);
    multiline.use.push(answers.use);

    const licenseChoice = {
        badge: "",
        path: ""
    }
    if (answers.license === "MIT") {
        writeFileAsync("license.txt", licenses.MIT);

    } else if (answers.license === "GNU AGPLv3") {
        
    } else if (answers.license === "GNU GPLv3") {
        
    } else if (answers.license === "GNU LGPLv3") {
        
    } else if (answers.license === "Mozilla Public License 2.0") {
        
    } else if (answers.license === "Apache License 2.0") {
        
    } else if (answers.license === "Boost Software License 1.0") {
        
    } else if (answers.license === "The Unclicense") {
        
    }

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
${}

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