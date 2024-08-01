const inquirer = require('inquirer');
const { Pool } = require('pg');
const queries = require('./queries');

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'employee_management',
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

const viewDepartments = () => {
  pool.query(queries.viewDepartments, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    mainMenu();
  });
};

const viewRoles = () => {
  pool.query(queries.viewRoles, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    mainMenu();
  });
};

const viewEmployees = () => {
  pool.query(queries.viewEmployees, (err, res) => {
    if (err) throw err;
    console.table(res.rows);
    mainMenu();
  });
};

const addDepartment = () => {
  inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:'
    }
  ]).then((answer) => {
    pool.query(queries.addDepartment, [answer.name], (err, res) => {
      if (err) throw err;
      console.log(`Added department ${answer.name}`);
      mainMenu();
    });
  });
};

const addRole = () => {
  inquirer.prompt([
    {
      name: 'title',
      type: 'input',
      message: 'Enter the name of the role:'
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the salary for the role:'
    },
    {
      name: 'department_id',
      type: 'input',
      message: 'Enter the department ID for the role:'
    }
  ]).then((answer) => {
    pool.query(queries.addRole, [answer.title, answer.salary, answer.department_id], (err, res) => {
      if (err) throw err;
      console.log(`Added role ${answer.title}`);
      mainMenu();
    });
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the employee\'s first name:'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the employee\'s last name:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the role ID for the employee:'
    },
    {
      name: 'manager_id',
      type: 'input',
      message: 'Enter the manager ID for the employee (leave blank if none):',
      default: null
    }
  ]).then((answer) => {
    pool.query(queries.addEmployee, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
      if (err) throw err;
      console.log(`Added employee ${answer.first_name} ${answer.last_name}`);
      mainMenu();
    });
  });
};

const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      name: 'employee_id',
      type: 'input',
      message: 'Enter the ID of the employee whose role you want to update:'
    },
    {
      name: 'role_id',
      type: 'input',
      message: 'Enter the new role ID for the employee:'
    }
  ]).then((answer) => {
    pool.query(queries.updateEmployeeRole, [answer.role_id, answer.employee_id], (err, res) => {
      if (err) throw err;
      console.log(`Updated employee's role`);
      mainMenu();
    });
  });
};


mainMenu();

