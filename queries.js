  // Define the SQL query to create the tables and the view, update certain attribute or select all rows
  const createEmployees = `
     CREATE TABLE  employees (
        employee_ID INT PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        middle_name VARCHAR(50),
        last_name VARCHAR(50) NOT NULL,
        nationality VARCHAR(50) ,
        date_of_birth DATE NOT NULL,
        position VARCHAR(50) NOT NULL,
        bank_account VARCHAR(50) NOT NULL,
        education VARCHAR(50)
    );`
    const createSalaries = `
    CREATE TABLE  salaries (
        employee_ID INT PRIMARY KEY,
        basic_salary DECIMAL(10,2) NOT NULL,
        transport_allowance DECIMAL(10,2) NOT NULL,
        accommodation DECIMAL(10,2) ,
        total_salary DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (employee_ID) REFERENCES employees(employee_ID)
      );`
      const createView = `
      CREATE VIEW  employee_salaries AS
        SELECT employees.employee_ID, first_name, last_name, basic_salary, transport_allowance, accommodation, total_salary
        FROM employees
        INNER JOIN salaries ON employees.employee_ID = salaries.employee_ID;

        `;
    const insertEmployee = " INSERT INTO employees ( "
       + "employee_ID, first_name, middle_name, last_name, nationality, date_of_birth, position,bank_account, education)"
       + " values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const insertSalary = "INSERT INTO salaries ( "
       + "employee_ID, basic_salary, transport_allowance, accommodation, total_salary  "
       + " values (?, ?, ?, ?, ?)";
    const updateEmployeeAttribute = `
        UPDATE employees
        SET {{attribute}} = ?
        WHERE employee_ID = ?;`
    const updateSalariesAttribute = `
        UPDATE salaries
        SET {{attribute}} = ?
        WHERE employee_ID = ?;    `
    const retreiveEmployeeSalary = `SELECT * FROM employee_salaries;`
    module.exports = {createEmployees, createSalaries, createView, insertEmployee, insertSalary, updateEmployeeAttribute,
                        updateSalariesAttribute, retreiveEmployeeSalary}