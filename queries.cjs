
module.exports = {
  getAllDepartments: `
    SELECT id AS department_id, name AS department_name
    FROM departments;
  `,
  
  getAllRoles: `
    SELECT roles.id AS role_id, roles.title AS job_title, departments.name AS department, roles.salary
    FROM roles
    JOIN departments ON roles.department_id = departments.id;
  `,
  
  getAllEmployees: `
    SELECT employees.id AS employee_id, employees.first_name, employees.last_name, roles.title AS job_title, 
           departments.name AS department, roles.salary, 
           CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees managers ON employees.manager_id = managers.id;
  `,
  
  addDepartment: `
    INSERT INTO departments (name) VALUES ($1) RETURNING id, name;
  `,
  
  addRole: `
    INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING id, title, salary, department_id;
  `,
  
  addEmployee: `
    INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) 
    RETURNING id, first_name, last_name, role_id, manager_id;
  `,
  
  updateEmployeeRole: `
    UPDATE employees SET role_id = $1 WHERE id = $2 RETURNING id, first_name, last_name, role_id, manager_id;
  `,
};
