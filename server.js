const express = require('express');
const router = require('./Routes/Router');
const bodyParser = require('body-parser');
var path = require('path');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/",router);
const PORT = process.env.PORT || 3000;
if(process.env.NODE_ENV === "production")
{
    app.use(express.static('client/build'));
    
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    });
}
else
{
    app.use(express.static('client/build'));
}


app.listen(PORT);

console.log("Server started");