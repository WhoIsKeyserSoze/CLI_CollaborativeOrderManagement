var mysql = require("mysql");
var inquirer = require("inquirer");
const chalk = require("chalk");
var Table = require("cli-table3");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "toor",
    database: "CLI_COM"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("Connected as ID:", connection.threadId + "\n");
    menu();
});


function menu() {
    console.log((chalk.red("Welcome to Order Management Interface!")))
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: ["See the current Order", "Exit"]
    }).then(function (response) {
        switch (response.choice) {
            case "See the current Order":
                orderItems();
                break;
            case "Exit":
                connection.end();
                console.log("You have exited the program. Please come again!")
                break;
        }
    })
}

function orderItems() {
    var query = "SELECT * FROM products";
    connection.query(query, function (error, response) {
        if (error) throw error;
        var divider = "\n------------------------------------------------------------\n";
        var greeting = "\n" + "Here is the current order :" + "\n"
        console.log(greeting);
        var table = new Table({
            head: ["ID", "Name", "Price", "Quantity"]
        });
        for (var i = 0; i < response.length; i++) {
            table.push([
                response[i].item_id,
                response[i].product_name,
                '$' + response[i].price,
                response[i].quantity
            ]);
        }
        console.log(table.toString() + "\n");
        orderManagement();
    })
}

function orderManagement() {
    console.log((chalk.green("Order Management")))
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: ["Modify order", "Exit"]
    }).then(async function (response) {
        switch (response.choice) {
            case "Modify order":
                await modifyOrder();
                break;
            case "Exit":
                connection.end();
                console.log("You have exited the program. Please come again!")
                break;
        }
    })
}

async function modifyOrder(){
    inquirer.prompt([{
        type: "input",
        message: "Please enter the ID of the product you would like to modify.",
        name: "item_id",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
        type: "input",
        message: "Press 1 for deleting product, 2 to change quantity",
        name: "action",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
    {
        type: "confirm",
        message: (chalk.green("Is this correct?")),
        name: "confirmation",
        default: true
    }])
    .then(function (answer) {
      connection.query("SELECT * FROM products WHERE ?", {
          itemId: answer.item_id
      }, function (error, response) {
          if(answer.action == 1){
              console.log("\nYou have chosen to delete item : " + answer.item_id);
              console.log("Processing ...");
              var update = "DELETE FROM products WHERE item_id = " + answer.item_id;
              connection.query(update, function (error, response) {
                  if (error) throw error;
                  console.log("-------------------------------")
                  console.log("Item successfully deleted !")
                  console.log("-------------------------------")
                  setTimeout(orderItems, 1000);
              })
          }
          else if (answer.action == 2){
              console.log("\nYou have chosen to change quantity on item : " + answer.item_id);
              console.log("Processing ...");
              inquirer.prompt([{
                  type: "input",
                  message: "Enter new quantity",
                  name: "newQ",
                  validate: function (value) {
                      if (isNaN(value) === false) {
                          return true;
                      }
                      return false;
                  }
              }]).then(function (ans){
                  var update = "UPDATE products SET quantity = " + ans.newQ + " WHERE item_id = " + answer.item_id;
                  connection.query(update, function (error, response) {
                      if (error) throw error;
                      console.log("-------------------------------")
                      console.log("Quantity successfully changed !")
                      console.log("-------------------------------")
                      setTimeout(orderItems, 1000);
                  })
              })

          }

        })
    });
}
