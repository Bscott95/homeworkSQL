const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require("constants");
// * Use [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console. There is a built-in version of `console.table`, but the NPM package formats the data a little better for our purposes.

// * You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a constructor function or a class be helpful for organizing these?

// * You will need to perform a variety of SQL JOINS to complete this assignment, and it's recommended you review the week's activities if you need a refresher on this.

// ![Employee Tracker](Assets/employee-tracker.gif)

// ### Hints

// * You may wish to include a `seed.sql` file to pre-populate your database. This will make development of individual features much easier.

// * Focus on getting the basic functionality completed before working on more advanced features.

// * Review the week's activities for a refresher on MySQL.

const inquirer = require("inquirer");
const mysql = require("mysql");
const {
  startPrompt,
  addPrompt,
  addDepPrompt,
  addRolePrompt,
  addEmpPrompt,
	viewPrompt,
	updatePrompt,
} = require("./prompts");
const { insertDep, insertRole, insertEmpt, viewDep, viewRole, viewEmp } = require("./querries");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_management",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected");
  runQuery();
});

const runQuery = () => {
  inquirer.prompt(startPrompt).then((answer) => {
    switch (answer.search) {
      case "Add records":
        addRecords();
        break;
      case "View records":
        viewRecords();
        break;
      case "Update records":
        updateRecords();
        break;
      default:
        connection.end();
    }
  });
};

// ==================ADD=======================
const addRecords = () => {
  inquirer.prompt(addPrompt).then((answer) => {
    switch (answer.addTo) {
      case "Add departments":
        addDepartments();
        break;
      case "Add roles":
        addRoles();
        break;
      case "Add employees":
        addEmployees();
        break;
      default:
        connection.end();
    }
  });
};
const addDepartments = () => {
  inquirer.prompt(addDepPrompt).then((answer) => {
    connection.query(insertDep, answer, (err) => {
      if (err) throw err;
    });
    console.log(`Added ${answer.dep_name} department to the database.`);
    runQuery();
  });
};
const addRoles = () => {
  inquirer
    .prompt(addRolePrompt)
    // .then(({title, salary, department_id}) => {
    .then((answer) => {
      // connection.query(insertRole, {title, salary, department_id}, err => {
      connection.query(insertRole, answer, (err) => {
        if (err) throw err;
      });
      console.log(answer.title, answer.salary, answer.department_id);
      // console.log(`Added role ${title} with a salary of ${salary} and department id of ${department_id} to the database.`);
      runQuery();
    });
};
const addEmployees = () => {
	connection.query(viewRole, (err, res) => {
		if (err) throw err;
		let rolesArr = [];
		for (let i = 0; i < res.length; i++){
			rolesArr.push(res[i])
		}
	addEmpPrompt.push({
		name: 'role',
		type: 'list',
		message: "What is the employee's role?",
		choices: function() {
			return res.map(res => res.title);
		}
	})
	inquirer.prompt(addEmpPrompt).then((res) => {
		let first_name = res.first;
		let last_name = res.last;
		let role_id;
		for (let i = 0; i < rolesArr.length; i++) {
			if (res.role === rolesArr[i].title) {
				role_id = rolesArr[i].id;
			}
		}
		connection.query(viewEmp, (err, res) => {
			if (err) throw err;
			let employeeArr = [];
			for (let i = 0; i < res.length; i++) {
				employeeArr.push(res[i]);
			}
			inquirer.prompt({
				name: 'manager',
				type: 'list',
				message: "Who is the employee's manager?",
				choices: function() {
					let arr = []
					if (res.length > 0) {
						for (let i = 0; i < employeeArr.length; i++) {
							arr.push(`${employeeArr[i].first_name} ${employeeArr[i].last_name}`);
						}
					}
					arr.push('No one');
					return arr;
				}
			}).then(res => {
				let manager_id;
				for (let i = 0; i < employeeArr.length; i++) {
					if (res.manager === `${employeeArr[i].first_name} ${employeeArr[i].last_name}`) {
						manager_id = employeeArr[i].id;
					}
				}
				connection.query(insertEmpt, {first_name, last_name, role_id, manager_id}, err => {
					if (err) throw err;
				});
				console.log(`Added employee ${first_name} ${last_name} to the database.`);
				runQuery();
			});
		});
	})
})
}


	// inquirer.prompt(addEmpPrompt).then(({ first_name, last_name }) => {
  //   // NEED TO DEFINE role_id and manager id
  //   // connection.query(insertEmpt, { first_name, last_name, role_id, manager id }, (err) => {
  //   connection.query(insertEmpt, { first_name, last_name }, (err) => {
  //     if (err) throw err;
  //   });
  //   console.log(`Added ${first_name} ${last_name} to the database.`);

// =================VIEW====================
const viewRecords = () => {
  inquirer.prompt(viewPrompt).then((answer) => {
    switch (answer.viewX) {
      case "view departments":
        viewDepartments();
        break;
      case "view roles":
        viewRoles();
        break;
      case "view employees":
        viewEmployees();
        break;
      default:
        connection.end();
    }
  });
};
const viewDepartments = () => {
  connection.query(viewDep, (err, res) => {
    if (err) throw err;
    console.table(res);
    runQuery();
  });
};
const viewRoles = () => {
  connection.query(viewRole, (err, res) => {
    if (err) throw err;
    console.table(res);
    runQuery();
  });
};
const viewEmployees = () => {
  connection.query(viewEmp, (err, res) => {
    if (err) throw err;
    console.table(res);
    runQuery();
  });
};

// ==============UPDATE======================
const updateRecords = () => {
  inquirer.prompt(updatePrompt).then((answer) => {
    switch (answer.updateX) {
      case "update employee roles":
        updateEmpRoles();
        break;
      case "update employee managers":
        updateEmpManagers();
        break;
      default:
        connection.end();
    }
  });
};

const updateEmpRoles = () => {
	connection.query(viewEmp, (err, res) => {
    if (err) throw err;
    let empArr = [];
    for (let i = 0; i < res.length; i++) {
      empArr.push(res[i]);
		}
		console.log(empArr)
    inquirer.prompt({
      name: 'employee',
      type: 'list',
      message: "Which employee's role do you want to update?",
      choices: function () {
        let arr = []
        if (res.length > 0) {
          for (let i = 0; i < empArr.length; i++) {
            arr.push(`${empArr[i].first_name} ${empArr[i].last_name}`);
          }
        }
        return arr;
      }
    }).then(res => {
      let id;
      let first_name;
      let last_name;
      for (let i = 0; i < empArr.length; i++) {
        if (res.employee === `${empArr[i].first_name} ${empArr[i].last_name}`) {
          id = empArr[i].id;
          first_name = empArr[i].first_name;
          last_name = empArr[i].last_name;
        }
      }
      connection.query(selectRoles, (err, res) => {
        if (err) throw err;
        let rolesArr = [];
        for (let i = 0; i < res.length; i++) {
          rolesArr.push(res[i]);
        }
        inquirer.prompt(
          {
            name: 'role',
            type: 'list',
            message: "What is the selected employee's updated role?",
            choices: function () {
              return res.map(res => res.title);
            }
          }
        ).then((res) => {
          let role_id;
          for (let i = 0; i < rolesArr.length; i++) {
            if (res.role === rolesArr[i].title) {
              role_id = rolesArr[i].id;
            }
          }
          connection.query(updateEmployees, [{role_id}, {id}], err => {
            if (err) throw err;
          })
          console.log(`${first_name} ${last_name}'s role has been updated to "${res.role}".`);
          start();
        });
      });
    });
  });
}