// require all of the packages!!!
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

    userSearch();
})

connection.query = util.promisify(connection.query);

// * The command-line application should allow users to:
//   * Add departments, roles, employees
//   * View departments, roles, employees
//   * Update employee roles
let userSearch = () => {
    inquirer
        .prompt({
            name: 'userQuestions',
            message: 'Would you like to view, add, and/or to make updates?',
            type: 'list',
            choices: [
                'Add departments',
                'Add roles',
                'Add employees',  
                'View departments',
                'View roles',
                'View employees',
                'Update employee roles',
                'none'
            ],
            validate: function (answer) {
                if (answer === 'none') {
                    return "User needs to make a selection!";
                }
                return true;
            },
            
        })
};

// }).then(answers => {
