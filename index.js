import inquirer from 'inquirer';
import chalk from 'chalk';
import consoleTable from 'console.table';
import pool from './db/database.js';

const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Exit',
        ],
    });

    switch (action) {
        case 'View All Departments':
            await viewDepartments();
            break;
        case 'View All Roles':
            await viewRoles();
            break;
        case 'View All Employees':
            await viewEmployees();
            break;
        case 'Add a Department':
            await addDepartment();
            break;
        case 'Add a Role':
            await addRole();
            break;
        case 'Add an Employee':
            await addEmployee();
            break;
        case 'Update an Employee Role':
            await updateEmployeeRole();
            break;
        case 'Exit':
            pool.end();
            console.log(chalk.green('Goodbye!'));
            process.exit();
    }
};

// Function to view all departments
const viewDepartments = async () => {
    try {
        const res = await pool.query('SELECT * FROM departments');
        console.table(res.rows);
    } catch (err) {
        console.error(chalk.red('Error fetching departments:', err.message));
    } finally {
        mainMenu();
    }
};

// Function to view all roles
const viewRoles = async () => {
    try {
        const res = await pool.query(`
            SELECT roles.id, roles.title, departments.name AS department, roles.salary
            FROM roles
            LEFT JOIN departments ON roles.department_id = departments.id
        `);
        console.table(res.rows);
    } catch (err) {
        console.error(chalk.red('Error fetching roles:', err.message));
    } finally {
        mainMenu();
    }
};

// Function to view all employees
const viewEmployees = async () => {
    try {
        const res = await pool.query(`
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employees
            LEFT JOIN roles ON employees.role_id = roles.id
            LEFT JOIN departments ON roles.department_id = departments.id
            LEFT JOIN employees manager ON employees.manager_id = manager.id
        `);
        console.table(res.rows);
    } catch (err) {
        console.error(chalk.red('Error fetching employees:', err.message));
    } finally {
        mainMenu();
    }
};

// Function to add a department
const addDepartment = async () => {
    try {
        const { name } = await inquirer.prompt({
            name: 'name',
            type: 'input',
            message: 'Enter the name of the department:',
        });

        await pool.query('INSERT INTO departments (name) VALUES ($1)', [name]);
        console.log(chalk.green('Department added successfully!'));
    } catch (err) {
        console.error(chalk.red('Error adding department:', err.message));
    } finally {
        mainMenu();
    }
};

// Function to add a role
const addRole = async () => {
    try {
        const departments = await pool.query('SELECT * FROM departments');
        const { title, salary, department_id } = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the role title:',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary for the role:',
            },
            {
                name: 'department_id',
                type: 'list',
                message: 'Select the department for this role:',
                choices: departments.rows.map((dept) => ({ name: dept.name, value: dept.id })),
            },
        ]);

        await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
        console.log(chalk.green('Role added successfully!'));
    } catch (err) {
        console.error(chalk.red('Error adding role:', err.message));
    } finally {
        mainMenu();
    }
};

// Function to add an employee
const addEmployee = async () => {
    try {
        const roles = await pool.query('SELECT * FROM roles');
        const employees = await pool.query('SELECT * FROM employees');
        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter the employee\'s first name:',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter the employee\'s last name:',
            },
            {
                name: 'role_id',
                type: 'list',
                message: 'Select the role for this employee:',
                choices: roles.rows.map((role) => ({ name: role.title, value: role.id })),
            },
            {
                name: 'manager_id',
                type: 'list',
                message: 'Select the employee\'s manager:',
                choices: [{ name: 'None', value: null }].concat(employees.rows.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))),
            },
        ]);

        await pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
        console.log(chalk.green('Employee added successfully!'));
    } catch (err) {
        console.error(chalk.red('Error adding employee:', err.message));
    } finally {
        mainMenu();
    }
};

// Function to update an employee's role
const updateEmployeeRole = async () => {
    try {
        const employees = await pool.query('SELECT * FROM employees');
        const roles = await pool.query('SELECT * FROM roles');

        const { employee_id, role_id } = await inquirer.prompt([
            {
                name: 'employee_id',
                type: 'list',
                message: 'Select the employee to update:',
                choices: employees.rows.map((emp) => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id })),
            },
            {
                name: 'role_id',
                type: 'list',
                message: 'Select the new role:',
                choices: roles.rows.map((role) => ({ name: role.title, value: role.id })),
            },
        ]);

        await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
        console.log(chalk.green('Employee role updated successfully!'));
    } catch (err) {
        console.error(chalk.red('Error updating employee role:', err.message));
    } finally {
        mainMenu();
    }
};


mainMenu();
