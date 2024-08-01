CREATE TABLE department (
id SERIAL PRIMARY KEY, 
name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary NUMERIC NOT NULL,
    department_id INTEGER REFERENCES department(id)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER REFERENCES role(id),
    manager_id INTEGER REFERENCES employee(id)
);
