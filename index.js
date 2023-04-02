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
  try {
    excuteQuery(connection, createEmployees);
  } catch (error) {
    console.error("An error occured creating Employees table: ",error);
  };
  try{
      excuteQuery(connection, createSalaries);
  } catch (error) {
    console.error("An error occured creating salaries table: ",error);
  };
  try{
      excuteQuery(connection, createView);
  } catch (error) {
    console.error("An error occured creating Employees&salaries view: ",error);
  };
  
  // filling up employees information
  try {
    excuteQuery(connection, insertEmployee, [1, "safwene", null , "jlassi",
                          "TUN", "1998-04-02", "Fullstack dev", "142Reg8x"
                        , null]);
  } catch (error) {
    console.error("An error occured executing employee insertion query: ", error);
  };
  try {
    excuteQuery(connection, insertEmployee, [2, "Ihab", null , "Dhouibi",
                          "TUN", "1994-03-25", "Backend dev", "002Mary4"
                        , null]);
  } catch (error) {
    console.error("An error occured executing employee insertion query: ", error);
  };
  
  // filling up salaries information 
  try {
    excuteQuery(connection, insertSalary, [1, 6.5 , 150, 500, 7.150]);
  }  catch (error) {
    console.error("An error occured executing salary insertion query: ", error);
  };
  try {
    excuteQuery(connection, insertSalary, [2, 3.5 , 75, 300, 3.850]);
  }  catch (error) {
    console.error("An error occured executing salary insertion query: ", error);
  };


  // update employee information
  try {
    updateAttributeEmp(connection, "first_name", "Iheb", 2);
  } catch (error) {
    console.error("An error occured updating employee attribute: ", error);
  };
  try {
    updateAttributeEmp(connection, "date_of_birth", "1998-06-07", 1);
  }  catch (error) {
    console.error("An error occured updating employee attribute: ",error);
  };
  
  // update salary information
  try {
    updateAttributeSal(connection, "total_salary", 3.875, 2);
  }  catch (error) {
    console.error("An error occured updating salary attribute: ",error);
  };

  // retrieve employee&salary information 
  try{
    connection.query(retreiveEmployeeSalary)
  }  catch (error) {
    console.error("An error occured fetching rows from employee&salary view: ", error);
  };
})



    excuteQuery = (connection, tableName, input=null) => {
 if (input) {
    connection.query(tableName, input, (err, results, fields) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Script excuted successfully');
        }
    
        // Release the connection back to the pool
        connection.release();
        
      });
 } else {
    connection.query(tableName,  (err, results, fields) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Script excuted successfully');
        }
    
        // Release the connection back to the pool
        connection.release();
        
      });
 }
};
updateAttributeEmp = (connection,  attributeName, attributeValue, rowId) => {
    const query = updateEmployeeAttribute.replace('{{attribute}}', attributeName);

  connection.query(query, [attributeValue, rowId], (err, results, fields) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Employee ${attributeName} updated successfully`);

    connection.release();
  })
};
updateAttributeSal = (connection,  attributeName, attributeValue, rowId) => {
  const query = updateSalariesAttribute.replace('{{attribute}}', attributeName);

connection.query(query, [attributeValue, rowId], (err, results, fields) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Salary ${attributeName} updated successfully`);

  connection.release();
})
};