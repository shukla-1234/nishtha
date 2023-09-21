express=require("express");
session=require("express-session");
app=express();
app.use(session({secret:'your secret',saveUninitialized: true,resave:false}));

mongoose=require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/mydb");
console.log("connectd");

mongooseSchema=mongoose.Schema({
Name:String,
Course:String,
Batch:String	
});
mongooseModel=mongoose.model("info",mongooseSchema);
app.get("/get",function(req,res){
mongooseModel.find((err,data)=>{

res.sendFile(__dirname+"/index.html");
});
});
app.get("/Insert",function(req,res){
n=req.query.txt1;
c=req.query.txt2;
b=req.query.txt3;
obj={"Name":n,"Coures":c,"Batch":b};
d=new mongooseModel(obj);
d.save();
res.send("Added");
});

app.get("/show",function(req,res){
mongooseModel.find((err,data)=>{
res.send(data);

});
});

app.get("/modify",function(req,res){
mongooseModel.update({Name:"Ajay"},{Course:"BCOM"},(err,data)=>{
res.send("successful:"+data);
});
});
  

app.get("/del",function(req,res){
mongooseModel.remove({Name:"n"},{Course:"c"},(err,data)=>{
res.send("removed successful ");
});
});


app.get("/",function(req,res){
res.sendFile(__dirname+"/login.html");
});

app.get("/page",function(req,res){
req.session.uname=req.query.txt1;
res.send("Successfully set session");
});

app.get("/rampage",function(req,res){
req.session.destroy();
res.send("successfully removed");
});

app.get("/show",function(req,res){
res.send(req.session.uname+"<a href='/rampage'>remove session</a>");
});

app.get("/home-page",function(req,res){
res.send("Home page");
});
app.get("/add-user",function(req,res){
res.sendFile(__dirname+"/Index.html");
});
app.get("/view-user",function(req,res){
res.sendFile(__dirname+"/view.html");
});

app.get("/modify-user",function(req,res){
res.sendFile(__dirname+"/Modify.html");
});

app.get("/remove-user",function(req,res){
res.sendFile(__dirname+"/Remove.html");
});


app.get("/Insert",function(req,res){
n=req.query.txt1;
c=req.query.txt2;
b=req.query.txt3;
obj={"Name":n,"Course":c,"Batch":b};
d=new mongooseModel(obj);
d.save();
res.send("Added");
});

app.get("/show-Data",function(req,res){
mongooseModel.find((err,data)=>{
res.send(data);
});
});

app.get("/modify",function(req,res){
n=req.query.txt1;
c=req.query.txt2;
mongooseModel.update({Name:n},{Course:c},(err,data)=>{
res.send("Successful:"+data);
});
});

app.get("/del",function(req,res){
n=req.query.txt1;
mongooseModel.remove({Name:n},(err,data)=>{
res.send("Removed Successful");
});
});





app.listen(3000);