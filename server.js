var express = require("express");
var mysql = require("mysql");
var inquirer = require ("inquirer");

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
            "View all employee by managers",
            "Add Employee",
            "Remove Employee",
            "Update Employee role",
            "Update Employee Manager",
            "Exit"
         ]
        
  
     })
     .then(function(answer){
         switch(answer.action){
           case "View all employees":
              viewEmployee();
              break;
           
            case "View all employee by departments":
               viewEmployeeDept();
               break;


            case "View all employee by managers":
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

            case "Update Employee Manager":
                 updateMng();
                 break;

            case "Exit":
                  connection.end();
                  break;
         };
     });

};