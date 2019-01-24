var express = require("express");
var request =  require("request");
var app = express();
app.set("view engine","ejs");

app.get("/",function(req,res){
        res.render("search");
    });
app.use(express.static("public"));

app.get("/results",function(req,res){
    var search = req.query.search;
    console.log(search);
    request("http://www.omdbapi.com/?apikey=thewdb&s="+search,function(error,response,body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var search = req.query.search;
            res.render("results",{json:data,searchreq:search});
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Movie app starting");
});