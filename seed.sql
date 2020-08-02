USE employee_infoDB;

INSERT INTO department (id, name)
VALUES (1, "Marketing");
INSERT INTO department (id, name)
VALUES (2, "HR");
INSERT INTO department (id, name)
VALUES (3, "IT");
INSERT INTO department (id, name)
VALUES (4, "Sales");
INSERT INTO department (id, name)
VALUES (5, "Customer Services");



INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Specialist", 35000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Manager", 75000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (3, "Assistant", 45000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUES (4, "Jn.Specialist", 30000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUES (5, "Sr.Specialits", 65000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUES (6, "System Administrator", 90000, 3);
INSERT INTO role (id, title, salary, department_id)
VALUES (7, "Developer", 90000, 3);
INSERT INTO role (id, title, salary, department_id)
VALUES (8, "Sales Manager", 70000, 4);
INSERT INTO role (id, title, salary, department_id)
VALUES (9, "Sales Representative", 45000, 4);
INSERT INTO role (id, title, salary, department_id)
VALUES (10, "Customer Assistant", 45000, 5);
INSERT INTO role (id, title, salary, department_id)
VALUES (11, "Customer Specialist", 60000, 5);



INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Carla", "Barbadosa", 1, 2);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "Sabrina", "Carlos", 2, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "Katerina", "Bridge", 3, 2);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "Jack", "Black", 4, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "Nadiya", "Simpson", 5, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "Ahmad", "Hakan", 6, 7);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "Fred", "Jonson", 7, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "Sheyla", "Abdu", 8, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "Lana", "White", 9, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "John", "Smith", 10, 8);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (11, "Nika", "Hasan", 11, 8);




SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;