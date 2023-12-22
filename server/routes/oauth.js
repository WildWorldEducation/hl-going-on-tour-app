const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'H3@lthyL1f35tyl3s',
    password: 'password',
    database: 'healthy_lifestyles'
});

/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MariaDB connected...');
});


// Clever API Credentials (from Clever developer account).
// TODO
// Replace these with environment variables - insecure.
var cleverClientId = '8bf56a5a145bbee01612';
var cleverClientSecret = '62a0f42b174f545cb7caeb6dbc3cdf9e346c1bcd';
var redirect_uri = "http://localhost:3000/oauth/clever"

router.get('/clever', (req, res) => {
    console.log(req.query.code);
    res.redirect('/')
});




module.exports = router 