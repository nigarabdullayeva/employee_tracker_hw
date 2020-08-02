var express = require("express");
var mysql = require("mysql");
var inquirer = require ("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Kamilla13",
    database: "employee_infoDB"
});

connection.connect(function(err) {
    if (err) throw err;
    //console.log(Connected successfully)
    startTrack();
  });

function startTrack () {
    inquirer
     .prompt({
         name: "actions",
         type: "list",
         message: "Please select action you like to do!",
         choices: [
            "View all employees",
            "View all employee by departments",
            "View all employee by managers ID",
            "Add Employee",
            "Remove Employee",
            "Update Employee role",,
            "Exit"
         ]
        
  
     })
     .then(function(answer){
         switch(answer.actions){
           case "View all employees":
              viewEmployee();
              break;
           
            case "View all employee by departments":
               viewEmployeeDept();
               break;


            case "View all employee by managers ID":
                viewEmployeeMng();
                break;
            
            case "Add Employee":
                 addEmployee();
                 break;
            
            case "Remove Employee":
                removeEmployee();
                break;

            case "Update Employee role":
                 updateRole();
                 break;


            case "Exit":
                  connection.end();
                  break;
         };
     });

};

function viewEmployee() {
   connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON department.id=role.department_id;", function(err, res){
        if (err) throw err;
        console.table(res)
        startTrack();
    });
};

   

function viewEmployeeDept() {
     inquirer
     .prompt({
        name: "departments",
        type: "list",
        message: "Please select department to search employees!",
        choices: [
           "Marketing",
           "HR",
           "IT",
           "Sales",
           "Customer Services"
        ]

     }).then(function(choices){
        connection.query("SELECT department.name, employee.id, first_name, last_name, title FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role. department_id = department.id WHERE department.name = ?",choices.departments, 
           function(err, res) {
            if (err) throw err;
            console.table(res);
            startTrack()

     });

    });

};

function viewEmployeeMng() {
    inquirer
    .prompt({
       name: "managers",
       type: "list",
       message: "Please select manager id to see employees!",
       choices: [
          "2",
          "7",
          "8",
          "null"
       ]
    }).then(function(answer){
        connection.query("SELECT department.name, employee.id, first_name, last_name, title FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role. department_id = department.id WHERE manager_id= ?", answer.managers,
        function(err,res){
            if(err) throw err;
            console.table(res);
            startTrack()
        });
        
    });

};

function addEmployee() {

    connection.query("SELECT role.id, role.title FROM role", function ( err, result) {
        if(err) throw err;
        let roleChoice =[];
        for (var i = 0; i < result.length; i++) {
            roleChoice.push(`${result[i].id}`);
        };
   
    inquirer
    .prompt([
        {
        name: "firstName",
        type: "input",
        message: "What is the first name of the employee?"
        },
        {
         name: "lastName",
         type: "input",
         message: "What is the last name of the employee?"
        },
        {
         name: "role",
         type: "list",
         message: "Please select employee's role id ?",
         choices: roleChoice
        },

    ]).then(function(answer){
        connection.query("INSERT INTO employee SET ?",
        
        { first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role,
          manager_id: null 
        }, function(err, res) {
            if(err) throw err;
            console.table ("New employee was created successfully!")
            startTrack();
        })
    })
})
};
function removeEmployee() {
    connection.query("SELECT id, concat(first_name, ' ', last_name) fullName FROM employee", function (err, employeeName) {
      if (err) throw err;
      var employeeNameArray = employeeName.map(employee => employee.id + " " + employee.fullName);
      for (var i = 0; i < employeeName.length; i++) {
        employeeNameArray.push(`${employeeName[i].first_name}`);
      }
  
      inquirer.prompt([
        {
          name: "name",
          type: "list",
          message: "Select the name of employee to remove !",
          choices: employeeNameArray
        }
      ])
        .then(function (answer) {
  
          connection.query("DELETE FROM employee WHERE ?",
            {
              id: answer.id
            },
            function (err) {
              if (err) throw err;
              console.log("Employee was deleted successfully!");
              startTrack();
            }
          );
        });
    });
  };

function updateRole() {
    connection.query("SELECT id, concat(first_name, ' ', last_name) fullName FROM employee", function (err, employeeName) {
        connection.query("SELECT * FROM role", function (err, roleId) {
        if (err) throw err;
        var employeeNameArray = employeeName.map(employee => employee.id + " " + employee.fullName);
        var roleArray = [];

        for (var i = 0; i < employeeName.length; i++) {
          employeeNameArray.push(`${employeeName[i].first_name}`);
        }

        for (var i = 0; i < roleId.length; i++) {
          roleArray.push(`${roleId[i].id}`);
        }

          inquirer.prompt([
            {
              name: "name",
              type: "list",
              message: "Select the name of employee to update his role !",
              choices: employeeNameArray
            },
            {
              name: "roleId",
              type: "list",
              message: "What role you want to give for selected employee?",
              choices: roleArray
            }
          ]).then(function(answer) {
              connection.query("UPDATE employee SET ? WHERE ?",
              [{ role_id:answer.roleId},
            {
                id:answer.employeeName
            }], function(err) {
                if(err) throw err;
                console.table( "Employee's role was updated successfully!");
                startTrack();
            });
          });
        

        });
    });
};