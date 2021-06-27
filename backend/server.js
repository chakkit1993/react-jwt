const express = require('express');

const cors = require('cors');
const mysql = require('mysql');
const app = express();
var bodyparser = require('body-parser');

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");



app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testsql'
  });

db.connect((err) => {
if(err){
    throw err;
}
console.log('connect database succesfuly');
}); 


    
 app.use("/api/v2/", require("./api/api_users"));


app.listen('3001' ,() =>{
    console.log('Server is running on port 3001');
});