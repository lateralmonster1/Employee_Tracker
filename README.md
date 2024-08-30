
# Employee Tracker

## Description

The Employee Tracker is a command-line application that allows business owners to manage and organize departments, roles, and employees within their company. This tool helps streamline business planning and resource management by providing an easy way to view and update essential employee and department information directly from the terminal.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

To install and set up the Employee Tracker on your local machine, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/employee-tracker.git
Navigate to the project directory:
cd employee-tracker

Install the dependencies:
npm install
Set up the database:

Create a PostgreSQL database named employee_tracker.
Run the SQL schema provided in db/schema.sql to create the necessary tables.
Ensure your PostgreSQL server is running, and update the .env file with your database credentials:

DB_USER=your_username
DB_HOST=localhost
DB_DATABASE=employee_tracker
DB_PASSWORD=your_password_here
DB_PORT=5432
Run the application:

node index.js --env-file
Usage
Once the application is running, you will be presented with a menu of options to manage the employee database. The options include:
View All Departments
View All Roles
View All Employees
Add a Department
Add a Role
Add an Employee
Update an Employee Role
Exit
Use the arrow keys to navigate through the options and press Enter to select an action.

Example Commands
View All Departments: Displays a formatted table of department names and IDs.
Add an Employee: Prompts you to enter the employee's first name, last name, role, and manager before adding them to the database.
Features
The Employee Tracker includes the following features:

View Departments: Displays a list of all departments, including department names and IDs.
View Roles: Shows the job titles, role IDs, departments, and salaries for all roles in the company.
View Employees: Displays detailed employee information, including IDs, first and last names, job titles, departments, salaries, and managers.
Add Department: Allows you to add a new department by entering the department name.
Add Role: Prompts for a role title, salary, and department, then adds the role to the database.
Add Employee: Collects the employee's first and last names, role, and manager information, then adds the employee to the database.
Update Employee Role: Allows you to select an employee and update their role within the company.
Technology Stack
The Employee Tracker is built using the following technologies:

Example video:
https://github.com/user-attachments/assets/07f72758-5497-42e4-aadd-c99a940c3834
https://github.com/user-attachments/assets/9359ef74-d215-45cf-9a0c-666d94eb11ff


Node.js: JavaScript runtime for executing the application.
PostgreSQL: Relational database management system for storing and managing employee data.
Inquirer.js: Library for creating interactive command-line prompts.
pg: Node.js client for interacting with PostgreSQL.
dotenv: Module for loading environment variables from a .env file.
chalk: Library for styling terminal string output.
console.table: Library for displaying tabular data in the console.

Contact
For questions or feedback, please contact:

Xavier Leon
Email: xavier3435@icloud.com
GitHub: lateralmonster1
