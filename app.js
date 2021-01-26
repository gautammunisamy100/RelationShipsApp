const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
app.use(express.static("public"));
app.use(express.static("javascript"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(fileUpload());

const URI ="mongodb+srv://gautam:gautam@cluster0.icph1.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(URI, {
    useNewUrlParser: true
}, function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Connected to the database");
    }
});
var relationshipSchema = new mongoose.Schema({
    ForName: String,
    ToName: String,
    Realtionship: String,
});
var Relationship = mongoose.model("Relationship", relationshipSchema);


app.get("/", function (req, res) {
 
    Relationship.find({}, function(error, relationship){
        if(error){
            console.log("There was a problem retrieving all of the relationship data from the database.");
            console.log(error);
        }else{
            res.render("homepage", {
                relationList: relationship
            });
        }
    });

});

app.get("/edit/:from/:to/:tag", function (req, res) {
    var from = req.params.from;
    var to = req.params.to;
    var tag = req.params.tag;
    res.render("editpeople", {
        from,to,tag
    });
});

app.get("/delete/:from/:to/:tag",function(req, res){
    var from = req.params.from;
    var to = req.params.to;
    var tag = req.params.tag;
    Relationship.deleteOne(
        {
           ForName: from,
           ToName: to,
           Realtionship: tag    
        },function(error){
            if(error){
                console.log("There was a problem in deleting.");
                console.log(error);
            }
    });
    res.redirect("/");
});

app.get("/relationshipTree", function (req, res) {
    Relationship.find({}, function(error, relationship){
        if(error){
            console.log("There was a problem retrieving all of the relationship data from the database.");
            console.log(error);
        }else{
            res.render("relationshipTree", {
                relationList: relationship
            });
        }
    });  
});
 
app.get("/allrelationship", function (req, res) {
 
    Relationship .find({}, function(error, relationship){
        if(error){
            console.log("There was a problem retrieving all of the relationship data  from the database.");
            console.log(error);
        }else{
            res.json(
                relationship
            );
        }
    });
});

app.get("/addPeople", function(req, res){
    res.render("addpeople");
});

app.post("/addPeople", function(req, res){

    let data = req.body;
    console.log("data given data "+data.Tag);
    Relationship .create({
        ForName: data.For.trim(),
        ToName: data.To.trim(),
        Realtionship:data.Tag
    }, function(error, data){
        if(error){
            console.log("There was a problem adding to the database");
        }else{
            console.log(data);
            console.log("added to database");
        }
    });
    
    res.redirect("/");
});
 
app.post("/updatePeople", function(req, res){
    var data = req.body;
    console.log("data given updata "+data);
    Relationship.updateOne({
        ForName: data.For,
        ToName: data.To,   
    },{
        ForName: data.For,
        ToName: data.To,
        Realtionship:data.Tag 
    }, function(error, data){
        if(error){
            console.log("There was a problem updating to the database");
        }else{
            console.log("update to database");
        }
    }
    
    );
   res.redirect("/");
});


app.get("/addPeople", function(req, res){
    res.render("addpeople");
});

app.get("*", function (req, res) {
    res.send("Sorry!! Can not find the Page .Please Go back to Homepage");
 });

app.listen("2000", function () {
    console.log("Server Started.");
});