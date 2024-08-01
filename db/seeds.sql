INSERT INTO department (name) VALUES ('Engineering'), ('Finance'), ('Marketing');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 120000, 1),
('Accountant', 70000, 2),
('Marketing Manager', 90000, 3);

INSERT INTO employee (first_name, last_name, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Joe', 'Bloggs', 3, NULL);