const inquirer = require('inquirer');
const mysql = require('mysql2');
const { Department } = require('./lib/department');
const { Role } = require('./lib/role');
const { Employee } = require('./lib/employee');
const config = require('./config');

// Create a connection to the database
const db = mysql.createConnection({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database,
});

// Function to retrieve all departments
const getDepartments = () => {
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.error(err);
      throw err; // or handle the error in an appropriate way
    }
    console.table(results);
    buildMainMenu();
  });

};

// Function to retrieve all roles
const getAllRoles = () => {
  db.query(`SELECT * FROM employee_role`, function (err, results) {
    if (err) {
      console.error(err);
    }
    console.table(results);
    buildMainMenu();
  });
};

// Function to retrieve all employees
const getAllEmployees = () => {
  db.query(`SELECT employee.id as employee_id, employee.first_name as employee_first_name, employee.last_name as employee_last_name, employee_role.title as job_title FROM employee JOIN employee_role ON employee.role_id = employee_role.id`, function (err, results) {
    if (err) {
      console.error(err);
    }
    console.table(results);
    buildMainMenu();
  });
};

// Function to add an employee
function addEmployee(firstName, lastName, role, manager) {
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [firstName, lastName, role, manager], function (err, results) {
    if (err) {
      console.error(err);
    }
    console.table(results);
    buildMainMenu();
  });
}

// Function to add a department
function addDept(department) {
  db.query(`INSERT INTO department (dept_name) VALUES (?)`, [department], function (err, results) {
    if (err) {
      console.error(err);
    }
    console.table(results);
    buildMainMenu();
  });
}

// Function to add a role
function addRole(role, salary, deptid) {
  db.query(`INSERT INTO employee_role (title, salary, dept_id) VALUES (?, ?, ?)`, [role, salary, deptid], function (err, results) {
    if (err) {
      console.error(err);
    }
    console.table(results);
    buildMainMenu();
  });
}

// Function to update an employee's role
function updateEmployeeRole(id, role) {
  db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [role, id], function (err, results) {
    if (err) {
      console.error(err);
    }
    console.table(results);
    buildMainMenu();
  });
}

const optionsEnums = {
  viewAllDept: 'viewAllDept',
  viewAllRoles: 'viewAllRoles',
  viewAllEmployees: 'viewAllEmployees',
  addDept: 'addDept',
  addRole: 'addRole',
  addEmployee: 'addEmployee',
  updateEmployeeRole: 'updateEmployeeRole',
};

const buildMainMenu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: [
          {
            name: optionsEnums.viewAllDept,
          },
          {
            name: optionsEnums.viewAllRoles
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
            name: optionsEnums.addEmployee,
          },
          {
            name: optionsEnums.updateEmployeeRole,
          },
        ],
      },
    ])
    .then((values) => {
      switch (values.option) {
        case optionsEnums.viewAllDept: {
          getDepartments();
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
        case optionsEnums.addEmployee: {
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
    .prompt([
      {
        type: 'input',
        message: 'Please enter the employee\'s first name:',
        name: 'firstname',
      },
      {
        type: 'input',
        message: 'Please enter the employee\'s last name:',
        name: 'surname',
      },
      {
        type: 'input',
        message: 'Please enter the employee\'s role:',
        name: 'role',
      },
      {
        type: 'input',
        message: 'Please enter the employee\'s manager ID:',
        name: 'manager',
      },
    ])
    .then((values) => {
      const newEmployee = new Employee(
        values.firstname,
        values.surname,
        values.role,
        values.manager
      );

      addEmployee(
        newEmployee.getName(),
        newEmployee.getSurname(),
        newEmployee.getRole(),
        newEmployee.getManager()
      );
    });
};

const addDeptOption = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What\'s the name of the department you wish to add?',
        name: 'name',
      },
    ])
    .then((values) => {
      const newDept = new Department(values.name);

      addDept(newDept.getDeptName());
    });
};

const addRoleOption = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'What\'s the name of the role you wish to add?',
        name: 'name',
      },
      {
        type: 'input',
        message: 'What\'s the salary of the role you wish to add? (e.g., 2)',
        name: 'salary',
      },
      {
        type: 'input',
        message: 'What\'s the department ID this role belongs to? (must be a number)',
        name: 'dept',
      },
    ])
    .then((values) => {
      const newRole = new Role(values.name, values.salary, values.dept);

      addRole(newRole.getRoleName(), newRole.getSalary(), newRole.getRoleDepartment());
    });
};

const updateEmployeeRoles = async () => {
  db.query(`SELECT * FROM employee`, async function (err, employeeResults) {
    db.query(`SELECT * FROM employee_role`, async function (err, roleResults) {
      if (err) {
        console.error(err);
      }
  
        const employeeNames = employeeResults.map(({ last_name, first_name, id }) => {
          return {
            name: `${last_name}, ${first_name}`,
            value: {
              last_name,
              first_name,
              id,
            },
          };
        });
  
        const employeePosition = roleResults.map(({ title, id }) => {
          return {
            name: title,
            value: {
              title,
              id,
            },
          };
        });
  
        const values = await inquirer.prompt([
          {
            type: 'list',
            choices: employeeNames,
            message: 'Choose an employee you would like to update:',
            name: 'employee',
          },
          {
            type: 'list',
            choices: employeePosition,
            name: 'newRole',
            message: 'What would you like to change the employee\'s role to?',
          },
        ]);
  
        updateEmployeeRole(values.employee.id, values.newRole.id);
      });
    });
  };