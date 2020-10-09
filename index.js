const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const copyFileAsync = util.promisify(fs.copyFile);
const mkDirAsync = util.promisify(fs.mkdir);

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

let d = new Date();
const year = d.getFullYear();

// const mitLicense = `MIT License

// Copyright (c) ${year} ${name}

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.`;



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
        choices: ["MIT License", "GNU AGPLv3 License", "GNU GPLv3 License", "GNU LGPLv3 License", "Mozilla Public License 2.0", "Apache License 2.0", "Boost Software License 1.0", "The Unclicense"]
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
        name: "repo",
        message: "Repository name on github",
        default: "repo"
    },
    // 13
    {
        type: "input",
        name: "email",
        message: "Email address",
        default: "address@mail.com"
    }
];

console.log("Welcome to the readme generator! Answer the following prompts to generate a readme md document for your project");

mkDirAsync("./package").catch((err) => 
{
    if (err) {
        console.log(`oops, there's already a folder named "package", please delete it and try again`);
        throw err;
    }
});

inquirer
.prompt(questions)
.then((answers) => {
    multiline.install.push(answers.install);
    multiline.describe.push(answers.describe);
    multiline.use.push(answers.use);

    let licenseBadge;

    if (answers.license === "MIT License") {
        const mitLicense = `MIT License

Copyright (c) ${year} ${answers.creator}

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
SOFTWARE.`;
        writeFileAsync("./package/license.txt", mitLicense).catch((err) => 
        {
            if (err) {
                console.log("write file problem")
                throw err;
            }
        });
        licenseBadge = badges.mit;
    } else {
        let filePath;
        if (answers.license === "GNU AGPLv3 License") {
            filePath = "./licenses/GNUAGPLv3.txt";
            licenseBadge = badges.gnuA3;
        } else if (answers.license === "GNU GPLv3 License") {
            filePath = "./licenses/GNUGPLv3.txt";
            licenseBadge = badges.gnuG3;
        } else if (answers.license === "GNU LGPLv3 License") {
            filePath = "./licenses/GNULGPLv3.txt";
            licenseBadge = badges.gnuL3;
        } else if (answers.license === "Mozilla Public License 2.0") {
            filePath = "./licenses/Mozilla.txt";
            licenseBadge = badges.mozilla;
        } else if (answers.license === "Apache License 2.0") {
            filePath = "./licenses/Apache2.txt";
            licenseBadge = badges.apache;
        } else if (answers.license === "Boost Software License 1.0") {
            filePath = "./licenses/Boost.txt";
            licenseBadge = badges.boost;
        } else if (answers.license === "The Unclicense") {
            filePath = "./licenses/Unlicense.txt";
            licenseBadge = badges.unlicense;
        }
        copyFileAsync(filePath, "./package/license.txt").catch((err) => 
        {
            if (err) {
                console.log("copy file problem")
                throw err;
            }
        }
    );
    }

    const template = `# ${answers.name}
[![project-languages-used](https://img.shields.io/github/languages/count/${answers.github
    .trim()
    .toLowerCase()}/${answers.repo.trim()}?color=important)](https://github.com/${answers.github.trim().toLowerCase()}/${answers.repo.trim()})
[![project-top-languages-used](https://img.shields.io/github/languages/top/${answers.github
    .trim()
    .toLowerCase()}/${answers.repo.trim()}?color=important)](https://github.com/${answers.github.trim().toLowerCase()}/${answers.repo.trim()})
${licenseBadge}
            
## Description
${answers.describe}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contribution Guidelines](#contribution-guidelines)
* [Test Instructions](#test-instructions) 
* [License](#license)

## Installation
\`${answers.install}\`

## Usage
\`${answers.use}\`
![${answers.imageAlt}](${answers.image})

## License
This application covered under the ${answers.license}

## Contribution Guidelines
${answers.contribution}

## Test Instructions
\`${answers.test}\`

## answers
Github: [${answers.github}](https://github.com/${answers.github})

Email: [${answers.email}](mailto:${answers.email})
`
    writeFileAsync("./package/readme.md", template).catch((err) => 
    {
        if (err) {
            console.log("write file problem")
            throw err;
        }
    });
})
.then(() => {console.log("Complete! Check the folder 'package' for readme and license")})