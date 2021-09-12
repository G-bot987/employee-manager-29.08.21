const inquirer = require('inquirer');
// // this package can't be found
const cTable = require('console.table');
// const fs = require('fs');

// const sequelize = require('./config/connection');

// Import and require mysql2
const mysql = require('mysql2');
const { Department } = require('./lib/department');
const { Role } = require('./lib/role');
const { Employee } = require('./lib/employee');
const config = require('./config');
// Connect to database
const db = mysql.createConnection(
  {
    host: config.host,
    // MySQL username,
    user: config.user,
    // MySQL password
    password: config.password,
    database: config.database,
  },

);

const getDept = () => {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    buildMainMenu()

  })
}


const getAllRoles = () => {
  db.query(`SELECT * FROM employee_role`, function (err, results) {
    if (err) {
      console.log(err);
      buildMainMenu()
    }
    console.table(results);
    buildMainMenu()

  })
}

// employees
const getAllEmployees = () => {
  db.query(`SELECT employee.id as employee_id, employee.first_name as employee_first_name, employee.last_name as employee_last_name, employee_role.title as job_title FROM employee JOIN employee_role ON employee.role_id = employee_role.id`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    buildMainMenu()

  })
}

function addEmployee(firstName, lastName, role, manager) {
  db.query(`insert into employee(first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)`, [firstName, lastName, role, manager], function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    buildMainMenu();

  })
}

function addDept(department) {
  db.query(`insert into department(dept_name) values (?)`, [department], function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    buildMainMenu();

  })
}

function addRole(role, salary, deptid) {
  db.query(`insert into employee_role(title, salary, dept_id) values (?, ?, ?)`, [role, salary, deptid], function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    buildMainMenu();

  })
}

function updateThisEmployeeRole(id,role) {
  

  db.query(`UPDATE employee SET role_id='${role}' WHERE id='${id}'`,  function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    buildMainMenu();

  })


  }







const optionsEnums = {

  viewAllDept: 'viewAllDept',
  viewAllRoles: 'viewAllRoles',
  viewAllEmployees: 'viewAllEmployees',
  addDept: 'addDept',
  addRole: 'addRole',
  addAemployee: 'addAemployee',
  updateEmployeeRole: 'updateEmployeeRole',


};

const team = [];

const buildMainMenu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'what would you like to do',
        name: 'option',
        choices: [
          {
            name: optionsEnums.viewAllDept,
          },
          {
            name: optionsEnums.viewAllRoles,
          },
          {
            name: optionsEnums.viewAllEmployees,
          },
          {
            name: optionsEnums.addRole,
          },
          {
            name: optionsEnums.addDept,
          },
          {
            name: optionsEnums.addAemployee,
          },
          {
            name: optionsEnums.updateEmployeeRole,
          },

        ],
      },
    ]).then(values => {
      switch (values.option) {
        case optionsEnums.viewAllDept: {
          // viewDepts();
          getDept();
          break;
        }
        case optionsEnums.viewAllRoles: {
          getAllRoles();
          break;
        }
        case optionsEnums.viewAllEmployees: {
          getAllEmployees();
          break;
        }
        case optionsEnums.addRole: {
          addRoleOption();
          break;
        }
        case optionsEnums.addDept: {
          addDeptOption();
          break;
        }
        case optionsEnums.addAemployee: {
          addEmployeeOption();
          break;
        }
        case optionsEnums.updateEmployeeRole: {
          updateEmployeeRoles();
          break;
        }
      }
    });
};

buildMainMenu();

const addEmployeeOption = () => {
  inquirer
    .prompt([{
      type: 'input',
      message: 'please enter the employees first name?',
      name: 'firstname',
    },
    {
      type: 'input',
      message: 'please enter the employees surname',
      name: 'surname',
    },
    {
      type: 'input',
      message: 'whats the employees role',
      name: 'role',
    },
    {
      type: 'input',
      message: 'what is the employees manager id',
      name: 'manager',
    },
    ]).then(values => {
      const newEmployee = new Employee(values.firstname, values.surname, values.role, values.manager)

      addEmployee(newEmployee.getName(), newEmployee.getSurname(), newEmployee.getRole(), newEmployee.getManager())
    });
};


const addDeptOption = () => {
  inquirer
    .prompt([{
      type: 'input',
      message: 'whats the name of the department you wish to add?',
      name: 'name',
    },

    ]).then(values => {
      const newDept = new Department(values.name)


      console.log(newDept.getDeptName())


      console.log(newDept)
      addDept(newDept.getDeptName())
      buildMainMenu()
    });
};


const addRoleOption = () => {
  inquirer
    .prompt([{
      type: 'input',
      message: 'whats the name of the role you wish to add?',
      name: 'name',
    },
    {
      type: 'input',
      message: 'whats the salary of the role you wish to add? (e.g 2)',
      name: 'salary',
    },
    {
      type: 'input',
      message: 'whats the department id this role belongs to? must be a number',
      name: 'dept',
    },

    ]).then(values => {
      const newRole = new Role(values.name, values.salary, values.dept)


      addRole(newRole.getRoleName(), newRole.getSalary(), newRole.getRoleDepartment())
      // addDept(newRole.getRoleDepartment())
      buildMainMenu()
    });
};

const updateEmployeeRoles = async () => {

  // db.query(`SELECT employee.id as employee_id, employee.first_name as employee_first_name, employee.last_name as employee_last_name, employee_role.title as job_title FROM employee JOIN employee_role ON employee.role_id = employee_role.id`, function (err, results) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.table(results);
  //   buildMainMenu()

  // })




  db.query(`SELECT * FROM employee`, async function (err, employeeResults) {
    db.query(`SELECT * FROM employee_role`, async function (err, roleResults) {
      if (err) {
        console.log(err);
      }
      const employeeNames = employeeResults.map(({ last_name, first_name, id }) => {
        return {
          name: last_name,
          value: {
            last_name,
            first_name,
            id,
          }
        };
      });

      if (err) {
        console.log(err);
      }
      const employeePosition = roleResults.map(({ title,id }) => {
        return {
          name: title,
          value: {
            title,
            id
          }
        };
      });

      const values = await inquirer.prompt([
        {
          type: 'list',
          choices: employeeNames,
          message: 'Choice a employee you would like to update:',
          name: 'employee',
        },
        {
          type: 'list',
          choices: employeePosition,
          name: 'newRole',
          message: 'What would you like to change the employees role to?',




        }
      ]);
      updateThisEmployeeRole(values.employee.id, values.newRole.id);
      // console.log(values)

    })


  });
};



