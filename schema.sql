DROP DATABASE IF EXISTS employee_management;
CREATE database employee_management;

USE employee_management;
-- * **department**:
--   * **id** - INT PRIMARY KEY
--   * **name** - VARCHAR(30) to hold department name
CREATE TABLE emp_department (
    id INT AUTO_INCREMENT NOT NULL,
    dep_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- * **role**:
--   * **id** - INT PRIMARY KEY
--   * **title** -  VARCHAR(30) to hold role title
--   * **salary** -  DECIMAL to hold role salary
--   * **department_id** -  INT to hold reference to department role belongs to
CREATE TABLE emp_role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

-- * **employee**:
--   * **id** - INT PRIMARY KEY
--   * **first_name** - VARCHAR(30) to hold employee first name
--   * **last_name** - VARCHAR(30) to hold employee last name
--   * **role_id** - INT to hold reference to role employee has
--   * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name DECIMAL(10,4) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);


