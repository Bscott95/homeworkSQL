notBlankCheck = (input) => {
    input !== '' || 'Cannot leave blank';
}

const startPrompt = {
    name: "search",
    type: "list",
    message: "Would you like to add, view, or update records?",
    choices: ["Add records", "View records", "Update records"],
}

const addPrompt = {
    name: "addTo",
    type: "list",
    message: "Would you like to add information to the departments, roles, or employees table?",
    choices: ["Add departments", "Add roles", "Add employees"],
}

const addDepPrompt = {
    name: "dep_name",
    type: "input",
    message: "What is the name of the department you'd like to add?",
}

module.exports = {
    startPrompt,
    addPrompt,
    addDepPrompt,
}

