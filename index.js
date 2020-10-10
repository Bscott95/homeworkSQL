// Build a command-line application that at a minimum allows the user to:

//   * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles

// Bonus points if you're able to:

//   * Update employee managers

//   * View employees by manager

//   * Delete departments, roles, and employees

//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

// * Use the [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.

// * Use [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

// * Use [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.

// * You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a constructor function or a class be helpful for organizing these?

// * You will need to perform a variety of SQL JOINS to complete this assignment, and it's recommended you review the week's activities if you need a refresher on this.

// ![Employee Tracker](Assets/employee-tracker.gif)

// ### Hints

// * You may wish to include a `seed.sql` file to pre-populate your database. This will make development of individual features much easier.

// * Focus on getting the basic functionality completed before working on more advanced features.

// * Review the week's activities for a refresher on MySQL.

const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_management"
  });
  connection.connect(err => {
    if (err) throw err;
    console.log('connected');
    runSearch();
  });
  const runSearch = () => {
    inquirer.prompt({
      name: 'search',
      type: 'list',
      message: 'Would you like to add, view, or update records?',
      choices: ["Add records", "View records", "Update records"]
    }).then(answer => {
      switch(answer.search) {
        case 'Add records':
          addRecords();
          break;
        case 'View records':
          viewRecords();
          break;
        case 'Update records':
          updateRecords();
          break;
        default:
          connection.end();
      }
    });
  };
