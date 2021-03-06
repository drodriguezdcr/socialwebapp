const express = require('express');
const ejs = require('ejs');
const body = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const router = express.Router();

//dotenv vars
require("dotenv").config();

const hostde = process.env.HOST;
const userde = process.env.USER;
const passwordde = process.env.PASSWORD;
const databasede = process.env.DATABASE;
      

//Create connetion
const db = mysql.createConnection({
  host: hostde,
  user: userde,
  password: passwordde,
  database: databasede
});

//Connect
db.connect((err) => {
  if(err) throw err;
  console.log('MySQL Connected!');
  //res.send('Mysql connected...');
});

// parse application/x-www-form-urlencoded
router.use(body.urlencoded({ extended: false }))

// parse application/json
router.use(body.json())

router.get('/', (req, res) => {
  res.send('');
});


//get data from form to insert into database
router.post('/', (req, res) => {
  let email = req.body.email; //parses data
  let sql = 'SELECT * FROM users WHERE email = ?'; //inserts into db
  let query = db.query(sql, email, (err, results) => {
    let numRowsOfExistingEmails = results.length;
  //select to see if user exists first then then password
   if(numRowsOfExistingEmails > 0){
    // res.json({ status: 'unavailable' });
       res.send("Unavailable");
   } else {
     res.send("Available");
    // res.json({ status: 'available' }); 
   }
    })
});

module.exports = router;