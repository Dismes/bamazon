var mysql = require("mysql");
var inquirer = require('inquirer');
var prompt = inquirer.createPromptModule();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});



connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("The stuff you can buy are");
        console.log(res[0]);

        for (i = 0; i < res.length; i++) {
            console.log("Product: " + res[i].product_name);
            console.log("Price: " + res[i].price);
            console.log("Quantity: " + res[i].quantity);
        }
        whatTOBuy(res);

        connection.end();
    });
}
var buying;
var amount;
var price;
var BuyingChoiceAmount;
var which;

function whatTOBuy(res) {
    inquirer.prompt([{
        type: 'list',
        name: 'Item',
        choices: function () {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].product_name);
            }
            return choiceArray;
        },
        message: 'What do like to buy?'
    }]).then(function (answers) {
        buying = answers;
        console.log(buying.Item);
        return res;
    }).then(hello);
}

function hello(res) {
    console.log("hello");
    console.log(buying.Item);
    inquirer.prompt([{
        type: 'list',
        name: 'Amount',
        choices: function () {
            var choiceArray = [];
        
            for (i = 0; i < res.length; i++) {

                if (buying.Item === res[i].product_name) {
                    console.log("fouind");
                    console.log(res[i].quantity);
                    BuyingChoiceAmount = res[i].quantity;
                    price = res[i].price;
                    console.log(price);
                    console.log(BuyingChoiceAmount);
                    which = i;
                }
            }
            for (i = 0; i < BuyingChoiceAmount + 1; i++) {
                console.log("chciearray");
                choiceArray.push("" + i);
            }
            return choiceArray
        },
        message: "How many would you like to buy"
    }]).then(function (answers) {
        console.log(answers.Amount);
        amount = parseInt(answers.Amount);
        console.log(amount);
    }).then(calculatePrice);
};

function calculatePrice() {
    console.log("So you bought " + amount + " " + buying.Item + " for a total of " + (amount * price) + "dollars");
    console.log("Thanks for doing business");
    var query = connection.query([{
        quantity: BuyingChoiceAmount -  amount
    }, {
        product_name: buying.Item
    }])

    console.log("no");
    
}