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
    //   password: 'password',
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
 * Clever OAuth Flow. 
 * 
 * 1) Redirect to Clever login screen
 * 2) If user logs in to Clever successfully
 * 3) Get the authentication code from Clever
 * 4) Then, using the apps credentials, exchange that code for the user's token.
 * 5) Then, log the user in
 * 5a) First, check if their Clever ID number already exists on the app. If so, log them in.
 * 5b) If not, check if their Clever email exists on the system. Add their Clever ID and log them in.
 * 5c) Otherwise, create new account.
 */
// Clever API redirect URL. The authentication code from Clever is delivered here.
// If the user successfully logs in to Clever.
var authenticationCode;
router.get('/clever', (req, res) => {
    // Get the code from the url params, after the user has successfully logged in.
    authenticationCode = req.query.code;
    var token;
    var options;
    // POST request to Clever to get the user token, using the above code.
    fetch('https://clever.com/oauth/tokens', {
        method: 'POST',
        body: JSON.stringify({
            code: authenticationCode,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri
        }),
        // Need to fix the below.
        // Not secure to hardcode the authentication.
        // Should be environmental variable.
        headers: {
            'Authorization': `Basic OGJmNTZhNWExNDViYmVlMDE2MTI6NjJhMGY0MmIxNzRmNTQ1Y2I3Y2FlYjZkYmMzY2RmOWUzNDZjMWJjZA==`,
            'Content-type': 'application/json; charset=UTF-8'
        },
    })
        .then((response) => response.json())
        .then((json) => {
            // Receive the user's token.
            token = json.access_token
            token = "Bearer " + token
            console.log(token)
            options = {
                method: 'GET',
                headers: { "Authorization": token }
            };
            // Use the token to start getting user details from the Clever API.
            fetch('https://api.clever.com/v3.0/me', options)
                .then(response1 => response1.json())
                .then((response1) => {
                    user = response1
                    console.log(user)
                    // Fetch other user details.
                    fetch('https://api.clever.com/v3.0/users/' + user.data.id, options)
                        .then(response2 => response2.json())
                        .then((response2) => {
                            // Get all user details available.
                            // This is the user data from Clever:
                            // user.data.id (Clever user ID) 
                            // user.data.email
                            // user.data.name.first
                            // user.data.name.last
                            // user.data.roles
                            user = response2
                            // Check if Clever ID exists in the system.
                            let sqlQuery1 = "SELECT * FROM users WHERE clever_id = '" + user.data.id + "';";
                            let query = conn.query(sqlQuery1, (err, results) => {
                                try {
                                    if (err) {
                                        throw err;
                                    }
                                    else {
                                        if (typeof results[0] !== 'undefined') {
                                            // Log user in.        
                                            req.session.userId = results[0].id
                                            req.session.userName = results[0].username
                                            req.session.isAdmin = results[0].is_admin
                                            res.redirect('/');
                                        }
                                        // Check if Clever user email addressID exists in the system.
                                        else {
                                            let sqlQuery2 = "SELECT * FROM users WHERE email = '" + user.data.email + "';";
                                            let query = conn.query(sqlQuery2, (err, results) => {
                                                try {
                                                    if (err) {
                                                        throw err;
                                                    }
                                                    else {
                                                        if (typeof results[0] !== 'undefined') {
                                                            // Update the DB record for the user, to include their Clever ID.
                                                            let sqlQuery3 = "UPDATE users SET clever_id='" + user.data.id + "' WHERE email=" + user.data.email;
                                                            let query = conn.query(sqlQuery3, (err, results) => {
                                                                try {
                                                                    if (err) {
                                                                        throw err;
                                                                    }
                                                                    // Log user in.        
                                                                    req.session.userId = results[0].id
                                                                    req.session.userName = results[0].username
                                                                    req.session.isAdmin = results[0].is_admin
                                                                    res.redirect('/');
                                                                } catch (err) {
                                                                    next(err)
                                                                }
                                                            });
                                                        }
                                                        // Create the user.
                                                        else {
                                                            var email = user.data.email
                                                            var username = user.data.email
                                                            var firstName = user.data.name.first
                                                            var lastName = user.data.name.last
                                                            var cleverId = user.data.id
                                                            // Log user in.       
                                                            req.session.userName = username
                                                            // TODO
                                                            // Change the below depending on Clever role.
                                                            req.session.isAdmin = 0

                                                            var date_time = new Date();
                                                            let date = ("0" + date_time.getDate()).slice(-2);
                                                            let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
                                                            let year = date_time.getFullYear();
                                                            var currentDate = year + "-" + month + "-" + date
                                                            var startDate = currentDate;
                                                            // TODO
                                                            // Change the below depending on Clever role (isAdmin).
                                                            let data = { first_name: firstName, last_name: lastName, username: username, email: email, is_admin: 0, start_date: startDate, clever_id: cleverId };
                                                            let sqlQuery4 = "INSERT INTO users SET ?";
                                                            let query = conn.query(sqlQuery4, data, (err, results) => {
                                                                if (err) {
                                                                    throw err;
                                                                }
                                                                else {
                                                                    res.redirect('/');
                                                                }
                                                            });
                                                        }
                                                    }
                                                } catch (err) {
                                                    next(err)
                                                }
                                            });
                                        }
                                    }
                                } catch (err) {
                                    next(err)
                                }
                            });
                        })
                        .catch(err => console.error(err));
                })
                .catch(err => console.error(err));
        })
        .catch(error => {
            console.log(error)
        })
});



module.exports = router 