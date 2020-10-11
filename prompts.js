notBlankCheck = (input) => {
  return input !== "" || "Cannot leave blank";
};

const startPrompt = {
  name: "search",
  type: "list",
  message: "Would you like to add, view, or update records?",
  choices: ["Add records", "View records", "Update records"],
  validate: notBlankCheck,
};

const addPrompt = {
  name: "addTo",
  type: "list",
  message:
    "Would you like to add information to the departments, roles, or employees table?",
  choices: ["Add departments", "Add roles", "Add employees"],
  validate: notBlankCheck,
};

const addDepPrompt = {
  name: "dep_name",
  type: "input",
  message: "What is the name of the department you'd like to add?",
  validate: notBlankCheck
};

const addRolePrompt = [
  {
    name: "title",
    type: "input",
    message: "What is the title of the role?",
    validate: notBlankCheck,
  },
  {
    name: "salary",
    type: "input",
    message: "What is the salary of the role?",
    validate: notBlankCheck,
  },
  {
    name: "department_id",
    type: "input",
    message: "What is the department ID of the role?",
    validate: notBlankCheck,
  },
];

const addEmpPrompt = [
  {
    name: 'first',
    type: 'input',
    message: "What is the employee's first name?",
    validate: notBlankCheck
  },
  {
    name: 'last',
    type: 'input',
    message: "What is the employee's last name?",
    validate: notBlankCheck
  }
];

module.exports = {
  startPrompt,
  addPrompt,
  addDepPrompt,
  addRolePrompt,
  addEmpPrompt,
};
