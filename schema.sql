DROP DATABASE IF EXISTS employee_management;
CREATE database employee_management;

USE employee_management;
-- * **department**:
--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name
CREATE TABLE emp_department (
    id INT NOT NULL,
    dep_name VARCHAR(30),
    PRIMARY KEY (id)
);

-- * **role**:
--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to
CREATE TABLE emp_role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,4),
    department_id INT,
    PRIMARY KEY (id)
)

-- * **employee**:
--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name DECIMAL(10,4),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id)
);


