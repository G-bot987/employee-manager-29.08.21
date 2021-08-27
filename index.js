const inquirer = require('inquirer');
const fs = require('fs');
const { Engineer } = require('./lib/engineer');
const { Intern } = require('./lib/intern');
const { Manager } = require('./lib/manager');







//   .then((data) => {

//     const filename = `Employee_Roster.html`;
//     const markdown = 

// `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Team Portfolio</title>
//     <link rel="stylesheet" href="resethref******">
//     <link rel="stylesheet" href="CSShref****">
// </head>
// <body>
// <header>
// <h1>"My Team"<h1>
// <header>

// <section class="employee_Sec">
//     <section class="headerbox">
//         <h1>${data.managerName}</h1>
//         <h2>"Manager"</h2>
//     </section>

//     <section class="info">
//         <p>${data.lmID}</p>
//         <p>${data.LmEmail}</p>
//         <p>${data.LmOffNum}</p>


//     </section>
// </section>







// // ### Questions 
// // ${data.github} 
// // ${data.email}

// // ### Description
// // ${data.description}

// // ### Installation 
// // ${data.installation}
// // ### instructions
// // ${data.instructions}
// // ### Usage 
// // ${data.usage}

// // ### Contributing 
// // ${data.contribting}

// // ### Tests
// // ${data.test}



// // </body>
// // </html>


// // `;



const employeeRoles = {
    engineer: 'engineer',
    intern: `intern`,
    manager: `manager`,
    generatehtml: 'generatehtml',

};

const team = [];

const buildMainMenu = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'which role are you adding',
                name: 'employeeRole',
                choices: [
                    {
                        name: employeeRoles.engineer,
                    },
                    {
                        name: employeeRoles.intern,
                    },
                    {
                        name: employeeRoles.manager,
                    },
                    {
                        name: employeeRoles.generatehtml,
                    }
                ],
            },
        ]).then(values => {
            switch (values.employeeRole) {
                case employeeRoles.engineer: {
                    addEngineer();
                    break;
                }
                case employeeRoles.intern: {
                    addIntern();
                    break;
                }
                case employeeRoles.manager: {
                    addManager();
                    break;
                }
                case employeeRoles.generatehtml: {
                    generateHtml();
                    break;
                }
            }
        });
};

buildMainMenu();

const addEngineer = () => {
    inquirer
        .prompt([{
            type: 'input',
            message: 'please enter the engineers name?',
            name: 'Name',
        },
        {
            type: 'input',
            message: 'please enter the Engineers ID',
            name: 'ID',
        },
        {
            type: 'input',
            message: 'please enter the  Engineers email',
            name: 'Email',
        },
        {
            type: 'input',
            message: 'please enter the Engineers github username',
            name: 'Git',
        },
        ]).then(values => {
            const newEngineer = new Engineer(values.Name, values.ID, values.Email, values.Git)
            team.push(newEngineer)
            buildMainMenu()
        });


}
const addIntern = () => {
    inquirer
        .prompt([{
            type: 'input',
            message: 'please enter the interns name?',
            name: 'Name',
        },
        {
            type: 'input',
            message: 'please enter the interns ID',
            name: 'ID',
        },
        {
            type: 'input',
            message: 'please enter the  interns email',
            name: 'Email',
        },
        {
            type: 'input',
            message: 'please enter the interns school',
            name: 'school',
        },
        ]).then(values => {
            const newIntern = new Intern(values.Name, values.ID, values.Email, values.school)
            team.push(newIntern)
            buildMainMenu()
        });

}

const addManager = () => {
    inquirer
        .prompt([{
            type: 'input',
            message: 'please enter the line managers name?',
            name: 'Name',
        },
        {
            type: 'input',
            message: 'please enter the line managers ID',
            name: 'ID',
        },
        {
            type: 'input',
            message: 'please enter the  line managers email',
            name: 'Email',
        },
        {
            type: 'input',
            message: 'please enter the line managers office number',
            name: 'OffNum',
        },
        ]).then(values => {
            const newManager = new Manager(values.Name, values.ID, values.Email, values.OffNum)
            team.push(newManager)
            buildMainMenu()

        });


}

const generateHtml = () => {

    const teamHtml = team.map(employee => {
        switch (employee.getRole()) {
            case 'Engineer': {
                return `
                <div class="employee card">
                name: ${employee.getName()}
                role: ${employee.getRole()}
                ID: ${employee.getId()}
                email: <a href=mailto:${employee.getEmail()}>${employee.getEmail()}</a>
                engineer github: <a href=https://github.com/${employee.getGithub()} target="_blank">${employee.getGithub()}</a>
               
                </div>
                `;
            }
            case `Manager`: {
                return `
                    <div class="employee card">
                    name: ${employee.getName()}
                    role: ${employee.getRole()}
                    ID: ${employee.getId()}
                    email: <a href=mailto:${employee.getEmail()}>${employee.getEmail()}</a>
                    Office: ${employee.getOfficenumber()}
                    
                    </div>
                `;
            }
            case `Intern`: {
                return `
                <div class="employee card">
                name: ${employee.getName()}
                role: ${employee.getRole()}
                ID: ${employee.getId()}
                email: <a href=mailto:${employee.getEmail()}>${employee.getEmail()}</a>
                Intern School: ${employee.getSchool()}</div>
                `;
            }
            default: {
                return `no worky`;
            }
        }
    }).join('');

    const html = `
        
        ${teamHtml}
    `;
    fs.writeFile('wow.html', html, (err) =>
        err ? console.log(err) : console.log('Success!')
    );
}