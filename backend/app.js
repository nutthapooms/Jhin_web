var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mysql = require('mysql');

var friends = ["Stark","Rogers","Romanoff","Clintt","Banner","Thor"];
var signin; 

var $ = require('jQuery');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tablejhin"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("connect!");
});



app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));


app.set("view engine","ejs");

 app.get("/",function (req,res) {
   res.render("home")
});

app.get("/friends",function(req,res){
    con.query("SELECT name, role, lane,price FROM champion", function (err, result) {
        if (err) throw err;

        res.render('friends', {
            output: result,
            total: Object.keys(result).length

        });
    });
});

app.get("/jhin",function(req,res){
    res.render("landingpage",{signin:signin});
})

app.post("/signin",function(req,res){
    var signinb = req.body.signin;
    res.redirect("/friends");
});

app.post("/login",function(req,res){
    var signinb = req.body.signin;
    res.redirect("http://www.facebook.com");
});


app.post("/jhin",function(req,res){
    res.redirect("jhin");
});

app.post("/addchampion",function(req,res){
    data  = {
        name : req.body.Name,
        role : req.body.Role,
        lane : req.body.Lane,
        price : req.body.Price
    };
    sql = "insert into champion(Name,Role,Lane,Price) values('" + data.name + "','" + data.role + "','" + data.lane + "','" + data.price +"')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");

    });
    friends.push(data.name);
    res.redirect("friends");
});


app.listen(8520,"192.168.1.40",function(){
    console.log("Server Start");
});