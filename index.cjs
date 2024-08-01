const inquirer = require('inquirer');
const { Pool } = require('pg');
const queries = require('./queries.cjs');

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'employee_tracker',
  password: 'your_password',
  port: 5432,
});

const mainMenu = () => {
  inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit'
      ]
    }
  ]).then((answer) => {
    switch (answer.action) {
      case 'View All Departments':
        viewDepartments();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'Exit':
        pool.end();
        process.exit();
    }
  });
};

const viewDepartments = async () => {
  const res = await pool.query(queries.getDepartments);
  console.table(res.rows);
  mainMenu();
};

const viewRoles = async () => {
  const res = await pool.query(queries.getRoles);
  console.table(res.rows);
  mainMenu();
};

const viewEmployees = async () => {
  const res = await pool.query(queries.getEmployees);
  console.table(res.rows);
  mainMenu();
};

const addDepartment = () => {
  inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:'
    }
  ]).then(async (answer) => {
    await pool.query(queries.addDepartment, [answer.name]);
    console.log(`Added department ${answer.name}`);
    mainMenu();
  });
};

const addRole = () => {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the title of the role:'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary of the role:'
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Enter the department ID for the role:'
    }
  ]).then(async (answer) => {
    await pool.query(queries.addRole, [answer.title, answer.salary, answer.department_id]);
    console.log(`Added role ${answer.title}`);
    mainMenu();
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the first name of the employee:'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the last name of the employee:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the role ID for the employee:'
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Enter the manager ID for the employee (leave blank if none):'
    }
  ]).then(async (answer) => {
    await pool.query(queries.addEmployee, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]);
    console.log(`Added employee ${answer.first_name} ${answer.last_name}`);
    mainMenu();
  });
};

const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'Enter the employee ID to update:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the new role ID for the employee:'
    }
  ]).then(async (answer) => {
    await pool.query(queries.updateEmployeeRole, [answer.role_id, answer.employee_id]);
    console.log(`Updated employee ${answer.employee_id} to role ${answer.role_id}`);
    mainMenu();
  });
};


mainMenu();

