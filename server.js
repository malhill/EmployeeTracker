// require all of the packages!!!
// Will attempt to split this into config folder later (as shown in MVC A:12 in RUCB-REPO)
const inquirer = require("inquirer");
const fs = require("fs");
const cTable = require('console.table');
const mysql = require("mysql");

const util = require("util");
const choices = require("inquirer/lib/objects/choices");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker"
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        res.status(404);
        return res.send("Error connecting to database.");
    } console.log("You're in!");

    userChoices();
})

connection.query = util.promisify(connection.query);

// * The command-line application should allow users to:
// * Add departments, roles, employees
// * View departments, roles, employees
// * Update employee roles
let userChoices = () => {
    // inquierer refresher from MySQL A:10
    inquirer
        .prompt({
            name: 'userQuestions',
            message: 'Would you like to view, add, and/or make updates?',
            type: 'list',
            choices: [
                // Will organize adding then viewing    
                'Add departments',
                'Add roles',
                'Add employees',
                'View departments',
                'View roles',
                'View employees',
                'Update employee roles',    
                // I want to create an exit application function for none/done
                'none/done'
            ],
            validate: function (answer) {
                if (answer === 'none') {
                    return "User needs to make a selection!";
                }
                return true;
            },
        }).then(answers => {
            // Switch example from Express A:5
            switch (answers) {
                case 'Add departments':
                    inquirer
                        .prompt([
                            {
                                name: 'department',
                                message: 'Enter department name:',
                                type: 'input',
                                validate: function (answer) {
                                    if (answer === '') {
                                        return "User needs to input a name!";
                                    }
                                    return true;
                                },
                            },
                        ]).then(answers => {
                            department(answers.department);
                            //revisiting the functionception that I learned from the weather app
                            runsearch();
                        });
                    break;
                //Copy and past the previous case, adding different variables
                case 'Add roles':
                    case 'Add departments':
                    inquirer
                        .prompt([
                            {
                                name: 'roles',
                                message: 'Enter the name of the title:',
                                type: 'input',
                                validate: function (answer) {
                                    if (answer === '') {
                                        return "User needs to input a title name!";
                                    }
                                    return true;
                                },
                            },
                            {
                                name: 'salary',
                                message: 'Enter the salary:',
                                type: 'input',
                                validate: function (answer) {
                                    if (answer === '') {
                                        return "User needs to input a value!";
                                    }
                                    return true;
                                },
                            },
                            {
                                name: 'department',
                                message: 'Enter the ID of the department:',
                                type: 'input',
                                validate: function (answer) {
                                    if (answer === '') {
                                        return "User needs to input an ID!";
                                    }
                                    return true;
                                },
                            },
                        ]).then(answers => {
                            roles(answers.roles, answers.salary, answers.department);
                            runsearch();
                        });
                    break;
                //Copy and past the previous case, adding different variables
                case 'Add employees':
                    inquirer
                        .prompt([
                            {
                                name: 'firstName',
                                message: 'Enter the employees first name:',
                                type: 'input',
                                validate: function (answer) {
                                    if (answer === '') {
                                        return "User needs to input a first name!";
                                    }
                                    return true;
                                },
                            },
                            {
                                name: 'lastName',
                                message: 'Enter the employees last name:',
                                type: 'input',
                                validate: function (answer) {
                                    if (answer === '') {
                                        return "User needs to input a last name!";
                                    }
                                    return true;
                                },
                            },
                            {
                                name: 'employeeRole',
                                message: 'Enter the employees role:',
                                type: 'input',
                                validate: function (answer) {
                                    if (answer === '') {
                                        return "User needs to input a role!";
                                    }
                                    return true;
                                },
                            },
                            {
                                name: 'managerAssignment',
                                message: 'Enter the managers ID:',
                                type: 'input',
                                validate: function (answer) {
                                    if (answer === '') {
                                        return "User needs to input a managers ID!";
                                    }
                                    return true;
                                },
                            },
                        ]).then(answers => {
                            employee(answers.firstName, answers.lastName, answers.employeeRole, answers.managerAssignment);
                            runsearch();
                        });
                    break;
                
                // Simpler, created functions below!
                case 'View departments':
                    department();
                    userChoices();
                    break;
                case 'View roles':
                    roles();
                    userChoices();
                    break;
                case 'View employees':
                    employee();
                    userChoices();
                    break;

                //Creating an update case
                case 'Update employee roles':
                    inquirer
                        .prompt([
                            {
                                name: 'employeeId',
                                message: 'Enter the employees ID:',
                                type: 'input',
                                validate: function (answer) {
                                    if (answer === '') {
                                        return "User needs to input an ID!";
                                    }
                                    return true;
                                },
                            },
                            {
                                name: 'roleId',
                                message: 'Enter the role ID:',
                                type: 'input',
                                validate: function (answer) {
                                    if (answer === '') {
                                        return "User needs to input an ID!";
                                    }
                                    return true;
                                },
                            },
                        ]).then(answers => {
                            updateRole(answers.employeeId, answers.roleId);
                            runsearch();
                        })
                    break;                    
            };
        });
};

