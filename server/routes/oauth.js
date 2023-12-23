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
var redirectUri = "http://localhost:3000/oauth/clever"



/**
 * Clever API redirect URL. The authentication code from Clever is delivered here.
 */
var authenticationCode;
router.get('/clever', (req, res) => {
    console.log(req.query.code);
    // Get the code from the url params, after the user has successfully logged in.
    authenticationCode = req.query.code;

    // POST request to Clever to get the user token.
    fetch('https://clever.com/oauth/tokens', {
        method: 'POST',
        body: JSON.stringify({
            code: authenticationCode,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri
        }),
        // Need to fix the below.
        headers: {
            'Authorization': `Basic OGJmNTZhNWExNDViYmVlMDE2MTI6NjJhMGY0MmIxNzRmNTQ1Y2I3Y2FlYjZkYmMzY2RmOWUzNDZjMWJjZA==`,
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch(error => {
            console.log(error)
        })

    res.send('Fetch API is available on the global scope by default')
});



module.exports = router 