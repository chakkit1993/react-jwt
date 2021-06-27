const express = require("express");
const router = express.Router();
const mysql = require('mysql');

const { createTokens ,validateToken} = require("../JWT");
const bcrypt = require("bcrypt");




const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testsql'
  });



  

  router.post("/users/login", async (req, res) => {
    const { username, password } = req.body;
    
    //const user = await Users.findOne({ where: { username: username } });

    db.query("SELECT * FROM users WHERE username = ?",[username ] ,(err, result) => {
      //console.log(result);
      if (err) {
        console.log(err);
      } else {
        if(result != ""){
          const dbPassword = result[0].password;


              bcrypt.compare(password, dbPassword).then((match) => {
            if (!match) {
              res
                .status(400)
                .json({   auth: false,
                          message : "Worng username / password",
                          token : "" });
            } else {
              const accessToken = createTokens(result[0]);
         
              res.cookie("access-token", accessToken, {
                maxAge: 60 * 60, // 60 min
                httpOnly: true,
              });

            

            
              res.json({
                message : "LOGGED IN",
                auth: true,
                user : result[0],
                token : accessToken});
            }
          });

        
          // res.send({
          //     username : result[0].username,
          //     email : result[0].email,
          //     role : "user",
          //     message : "Welcome to Login ",
          //     result : result 
          // });
        }else{
          res.status(400)
              .send({
            auth: false,
            message : "Worng username / password",
            token : ""
          });
        }
       
      }
    });



  });



  // router.post("/users/login", (req, res) => {
  //   const username = req.body.username;
  //   const password = req.body.password;
  //   // console.log(req.body.username);

  
  // });



  router.post("/users/register", (req, res) => {
    const { username, password , email } = req.body;
    //console.log ( req.body);
   
    bcrypt.hash(password, 10).then((hash) => {

      db.query(
        "INSERT INTO users (username ,password , email ) VALUES (?,?,?)",
        [username ,hash, email],
        (err, result) => {
          if (err) {
            res.status(400).json({ error: err });
          } else {
            res.send("Values Inserted");
          }
        }
      );
    });
  });



router.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });



  

  router.get("/login_in", validateToken, (req, res) => {
   
    // console.log( req.cookies);
    res.send("You loggin success");
  });

    

  router.get("/logout", (req, res) => {
   
    // console.log( req.cookies);
    res.send("You logout success");
  });





  module.exports = router;