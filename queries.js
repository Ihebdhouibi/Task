  // Define the SQL query to create the tables and the view, update certain attribute or select all rows
  const createEmployees = `
     CREATE TABLE  IF NOT EXISTS employees (
        employee_id INT PRIMARY KEY,
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
    CREATE TABLE  IF NOT EXISTS salaries (
        employee_id INT PRIMARY KEY,
        basic_salary DECIMAL(10,3) NOT NULL,
        transport_allowance DECIMAL(10,2) NOT NULL,
        accommodation DECIMAL(10,2) ,
        total_salary DECIMAL(10,3) NOT NULL,
        FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
      );`
      const createView = `
      CREATE VIEW employee_salaries AS
        SELECT employees.employee_ID, first_name, last_name,
        nationality, date_of_birth, position, bank_account,
         basic_salary, transport_allowance, accommodation, total_salary
        FROM employees
        INNER JOIN salaries ON employees.employee_id = salaries.employee_id;

        `;
    const insertEmployee = " INSERT INTO employees ( "
       + "employee_id, first_name, middle_name, last_name, nationality, date_of_birth, position,bank_account, education)"
       + " values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const insertSalary = "INSERT INTO salaries ( "
       + "employee_id, basic_salary, transport_allowance, accommodation, total_salary) "
       + " values (?, ?, ?, ?, ?)";
    const updateEmployeeAttribute = `
        UPDATE employees
        SET {{attribute}} = ?
        WHERE employee_id = ?;`
    const updateSalariesAttribute = `
        UPDATE salaries
        SET {{attribute}} = ?
        WHERE employee_id = ?;    `
    const retreiveEmployeeSalary = `SELECT * FROM employee_salaries;`
    module.exports = {createEmployees, createSalaries, createView, insertEmployee, insertSalary, updateEmployeeAttribute,
                        updateSalariesAttribute, retreiveEmployeeSalary}