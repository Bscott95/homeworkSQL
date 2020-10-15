const insertDep = 'INSERT INTO emp_department SET ?;';
const insertRole = 'INSERT INTO emp_role SET ?;';
const insertEmpt = 'INSERT INTO employee SET ?;';

const viewDep = 'SELECT * FROM emp_department;';
const viewRole = 'SELECT * FROM emp_role;';
const viewEmp = 'SELECT * FROM employee;';

const updateEmp = 'UPDATE employee SET ? WHERE ?;';

module.exports = {
    insertDep,
    insertRole,
    insertEmpt,
    viewDep,
    viewRole,
    viewEmp,
    updateEmp
}
