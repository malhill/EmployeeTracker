-- Seeds file like MVC A:12
USE employee_tracker;

-- Learning how set multiple values into INSERTS
-- https://stackoverflow.com/questions/6889065/inserting-multiple-rows-in-mysql#:~:text=INSERT%20statements%20that%20use%20VALUES,parentheses%20and%20separated%20by%20commas.&text=If%20you%20have%20your%20data,file%2C%20use%20LOAD%20DATA%20INFILE.
INSERT INTO department (dep_name) VALUES ('Full Stack Developer'),('Backend Developer'),('Game Developer');
INSERT INTO role (title, salary, dep_id) VALUES ('Full Stack Developer', 100000, 1),('Backend Developer', 100000, 2),('Game Developer', 75000, 3);
INSERT INTO employee (first_name, last_name, role_id, man_id) VALUES ('Billy', 'D. Williams', 1),('Batman', 'Dark Knight', '2'),('Duke', 'Nukem', 3);