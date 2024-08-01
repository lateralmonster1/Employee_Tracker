const pool = require('./db/connection');

const getDepartments = () => {
    return pool.query('SELECT * FROM department');
};


const getRoles = () => {
    return pool.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id');
  };
  
  const getEmployees = () => {
    return pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager
                       FROM employee
                       LEFT JOIN role ON employee.role_id = role.id
                       LEFT JOIN department ON role.department_id = department.id
                       LEFT JOIN employee AS manager ON employee.manager_id = manager.id`);
  };
  
  const addDepartment = (name) => {
    return pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  };
  
  const addRole = (title, salary, department_id) => {
    return pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  };
  
  const addEmployee = (first_name, last_name, role_id, manager_id) => {
    return pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  };
  
  const updateEmployeeRole = (employee_id, role_id) => {
    return pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  };

 
module.exports = {
    viewDepartments: 'SELECT * FROM department',
    viewRoles: 'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id',
    viewEmployees: `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
                      CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                    FROM employee 
                    LEFT JOIN role ON employee.role_id = role.id 
                    LEFT JOIN department ON role.department_id = department.id 
                    LEFT JOIN employee manager ON manager.id = employee.manager_id`,
    addDepartment: 'INSERT INTO department (name) VALUES ($1)',
    addRole: 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    addEmployee: 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    updateEmployeeRole: 'UPDATE employee SET role_id = $1 WHERE id = $2',
  };
  