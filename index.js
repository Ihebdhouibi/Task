// Import the mysql2 library
const mysql = require('mysql2');

const config = require('./config');
const { createEmployees, createSalaries, createView, insertEmployee, insertSalary,
  updateEmployeeAttribute, updateSalariesAttribute, retreiveEmployeeSalary } = require('./queries');


// Create a new connection pool
const pool = mysql.createPool(config);

// Get a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error(err);
    return;
  }

  // Setting up tables and view

  excuteQuery(connection, createEmployees);
  excuteQuery(connection, createSalaries);
  excuteQuery(connection, createView);


  // filling up employees information

  excuteQuery(connection, insertEmployee, [ "safwene", null, "jlassi",
    "TUN", "1998-04-02", "Fullstack dev", "142Reg8x"
    , null]);

  excuteQuery(connection, insertEmployee, [ "Ihab", null, "Dhouibi",
    "TUN", "1994-03-25", "Backend dev", "002Mary4"
    , null]);

  // filling up salaries information 

  excuteQuery(connection, insertSalary, [ 6.5, 150, 500, 7.150]);

  excuteQuery(connection, insertSalary, [ 3.5, 75, 300, 3.850]);



  // update employee information
  updateAttribute("employees", connection, "date_of_birth", "1998-06-07", 1);
  updateAttribute("employees", connection, "first_name", "Iheb", 2)
  // update salary information
  updateAttribute("salaries", connection, "total_salary", 3.875, 2);

  // retrieve employee&salary information 
  connection.query(retreiveEmployeeSalary, (err, results) => {
    if (err) {
      console.log(`An error occured fetching rows: `,err);
      return;
    }
    results.forEach((elm) => {
      console.log(elm);
    })
    
  })

})



excuteQuery = (connection, tableName, input = null) => {
  const callback = (err) => {
    if (err) {
      console.error(err);
    } else {

      console.log('Script executed successfully');
    }

    // Release the connection back to the pool
    connection.release();
  }
  const args = input ? [tableName, input, callback] : [tableName, callback];
  connection.query(...args);
};
updateAttribute = (tableName, connection, attributeName, attributeValue, rowId) => {
  const queryName = tableName == "employees" ? updateEmployeeAttribute : updateSalariesAttribute;
  const query = queryName.replace('{{attribute}}', attributeName);

  connection.query(query, [attributeValue, rowId], (err, results, fields) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`${tableName} ${attributeName} updated successfully`);

    connection.release();
  })
};
