var mysql = require("mysql");
var inquirer = require("inquirer");
const chalk = require("chalk");
var Table = require("cli-table3");

var connection = mysql.createConnection({
    host: "localhost",
    user: "jean",
    password: "password",
    database: "CLI_COM",
    insecureAuth : true
});


connection.connect(function(err){
    if(err) throw err;
    console.log("Connected as ID:", connection.threadId + "\n");
    menu();
});


function menu() {
    console.log((chalk.red("Welcome to Participative Order Interface!")))
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: ["See the current Order", "Add items from catalogue", "Exit"]
    }).then(function (response) {
        switch (response.choice) {
            case "See the current Order":
                orderItems();
                break;
            case "Add items from catalogue":
                catalogueItems();
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
        choices: ["Modify items added by me", "Exit"]
    }).then(async function (response) {
        switch (response.choice) {
            case "Modify items added by me":
                console.log("Not Implemented / Maybe later")
                connection.end();
                break;
            case "Exit":
                connection.end();
                console.log("You have exited the program. Please come again!")
                break;
        }
    })
}


function catalogueItems() {
    var query = "SELECT * FROM catalogue";
    connection.query(query, function (error, response) {
        if (error) throw error;
        var divider = "\n------------------------------------------------------------\n";
        var greeting = "\n" + "Catalogue :" + "\n"
        console.log(greeting);
        var table = new Table({
            head: ["ID", "Name", "Price"]
        });
        for (var i = 0; i < response.length; i++) {
            table.push([
                response[i].item_id,
                response[i].product_name,
                '$' + response[i].price
            ]);
        }
        console.log(table.toString() + "\n");
        addToOrder();
    })
}


function addToOrder(){
    inquirer.prompt([{
        type: "input",
        message: "Please enter the ID of the product you would like to add to the order.",
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
        message: "Enter quantity for selected item :",
        name: "quantity",
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
      var itemID = answer.item_id
      connection.query("SELECT * FROM catalogue WHERE ?", {
          item_id: answer.item_id
      }, function (error, response) {
            var name = "(SELECT product_name FROM catalogue WHERE item_id = " + itemID +")";
            var price = "(SELECT price FROM catalogue WHERE item_id = "+ itemID +")";
            var add = "INSERT INTO products (product_name, price, quantity) VALUES (" + name + " , " + price + " , " + answer.quantity + ")";
            connection.query(add, function (error, response) {
                if (error) throw error;
                console.log("-------------------------------")
                console.log("Item successfully added !")
                console.log("-------------------------------")
                setTimeout(catalogueItems, 1000);
            })

        })
    });
}
