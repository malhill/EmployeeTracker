DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
  id INTEGEREGER AUTO_INCREMENT PRIMARY KEY,
  dep_name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
  id INTEGER  AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL  NOT NULL,
  dep_id INTEGER  NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINTEGER fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INTEGER  AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
);