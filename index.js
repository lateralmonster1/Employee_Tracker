const inquirer = require('inquirer');
const queries = require('./queries');

const mainMenu = () => {
    inquirer
     .prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles', 
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ],

    })    

.then((answer) => {
    switch (answer.action) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      default:
        process.exit();
    }
  });
};
          
    const viewAllDepartments = () => {
        queries.getDepartments().then((result) => {
            console.table(result.rows);
            mainMenu();
        });
    };
    
    const viewAllEmployees = () => {
        queries.getEmployees().then((result) => {
            console.table(result.rows);
            mainMenu();
        });
    };

    const addDepartment = () => {
        inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
          })
          .then((answer) => {
            queries.addDepartment(answer.name).then(() => {
              console.log('Department added successfully');
              mainMenu();
            });
          });
      };
      
      const addRole = () => {
        queries.getDepartments().then((result) => {
          const departments = result.rows.map((row) => ({ name: row.name, value: row.id }));
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'title',
                message: 'Enter the name of the role:',
              },
              {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary of the role:',
              },
              {
                type: 'list',
                name: 'department_id',
                message: 'Select the department for the role:',
                choices: departments,
              },
            ])
            .then((answers) => {
              queries.addRole(answers.title, answers.salary, answers.department_id).then(() => {
                console.log('Role added successfully');
                mainMenu();
              });
            });
        });
      };
      
      const addEmployee = () => {
        Promise.all([queries.getRoles(), queries.getEmployees()]).then(([rolesResult, employeesResult]) => {
          const roles = rolesResult.rows.map((row) => ({ name: row.title, value: row.id }));
          const managers = employeesResult.rows.map((row) => ({ name: `${row.first_name} ${row.last_name}`, value: row.id }));
          managers.push({ name: 'None', value: null });
      
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name of the employee:',
              },
              {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name of the employee:',
              },
              {
                type: 'list',
                name: 'role_id',
                message: 'Select the role for the employee:',
                choices: roles,
              },
              {
                type: 'list',
                name: 'manager_id',
                message: 'Select the manager for the employee:',
                choices: managers,
              },
            ])
            .then((answers) => {
              queries.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id).then(() => {
                console.log('Employee added successfully');
                mainMenu();
              });
            });
        });
      };
      
      const updateEmployeeRole = () => {
        Promise.all([queries.getEmployees(), queries.getRoles()]).then(([employeesResult, rolesResult]) => {
          const employees = employeesResult.rows.map((row) => ({ name: `${row.first_name} ${row.last_name}`, value: row.id }));
          const roles = rolesResult.rows.map((row) => ({ name: row.title, value: row.id }));
      
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'employee_id',
                message: 'Select the employee to update:',
                choices: employees,
              },
              {
                type: 'list',
                name: 'role_id',
                message: 'Select the new role for the employee:',
                choices: roles,
              },
            ])
            .then((answers) => {
              queries.updateEmployeeRole(answers.employee_id, answers.role_id).then(() => {
                console.log('Employee role updated successfully');
                mainMenu();
              });
            });
        });
      };
      
      mainMenu();
