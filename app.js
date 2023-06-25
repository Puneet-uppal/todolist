const express=require("express");
const bodyParser=require("body-parser");

const app=express();

let items=[];
let workItems=[];

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/",function(req,res){
    var today=new Date();
    var options={
        weekday:"long",
        day:"numeric",
        month:"long"
    }

    var day=today.toLocaleDateString("en-US",options);
    res.render("list",{listTitle: day , newListItems:items});
});

app.post("/",function(req,res){
    let item=req.body.newItem;
    console.log(item);
    // res.render("list",{newListItem:item});
    items.push(item);
    res.redirect("/");
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List" , newListItems:workItems});
});

app.post("/work",function(req,res){
    let item=req.body.newItem;
    // console.log(req.body);
    if(req.body.list==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})

app.get("/about",function(req,res){
    res.render("about");
})


app.listen(3000,function(){
    console.log("server started on port 3000");
});