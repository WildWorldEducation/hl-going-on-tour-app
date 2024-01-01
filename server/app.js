var express = require('express');

var app = express();

// Middleware 
const mysql = require('mysql');
const bodyParser = require('body-parser');

const path = require('path')
const fs = require('fs').promises;
const publicPath = path.join(path.resolve(), "public");
const distPath = path.join(path.resolve(), "dist");

// Allow things to work.
var cors = require('cors')
app.use(cors())

// Login with Google.
var jwt = require('jsonwebtoken');

// Limit effects max image size that can be uploaded.
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true, parameterLimit: 50000 }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const sessions = require('express-session');
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For Vue Router.
var history = require('connect-history-api-fallback');

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// Route files.

app.locals.title = ''


// Route files.
const oauthRouter = require('./routes/oauth');
app.use('/oauth', oauthRouter);
const userRouter = require('./routes/users');
app.use('/users', userRouter);

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'H3@lthyL1f35tyl3s',
    //  password: 'password',
    database: 'healthy_lifestyles'
});


if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(distPath));
} else {
    app.use("/", express.static(publicPath));
}

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

// API calls ----------------------------------------------------------------

/**
 * Query user data.
 */
// Send the user session variable.
app.get('/api/get-session-details', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.session.userName) {
        req.session.isLoggedIn = true;
    }
    else {
        req.session.isLoggedIn = false;
    }

    res.json(req.session);
});

app.get('/api/user-details', function (req, res, next) {
    if (req.session.userName) {
        res.setHeader('Content-Type', 'application/json');
        res.json(req.session);
    }
    // Otherwise, redirect to login page.
    else
        res.redirect('/')
});


// Log in and out.
// Log in with username and password.
app.post('/api/login-attempt', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    // Execute SQL query that'll select the account from the database based on the specified username and password.
    let sqlQuery1 = "SELECT * FROM healthy_lifestyles.users WHERE healthy_lifestyles.users.username = '" + req.body.username + "' AND healthy_lifestyles.users.password = '" + req.body.password + "';";
    let query1 = conn.query(sqlQuery1, (err, results) => {
        try {
            if (err) {
                throw err;
            }
            // Create session object.
            else if (results.length > 0) {
                req.session.userId = results[0].id;
                req.session.userName = req.body.username;
                req.session.firstName = results[0].first_name;
                req.session.lastName = results[0].last_name;
                req.session.isAdmin = results[0].is_admin;
                res.json({ account: 'authorized' })
            } else {
                // If both the username and password are not correct, check if the account exists.
                let sqlQuery2 = "SELECT * FROM healthy_lifestyles.users WHERE healthy_lifestyles.users.username = '" + req.body.username + "';";
                let query2 = conn.query(sqlQuery2, (err, results) => {
                    try {
                        if (err) {
                            throw err;
                        }
                        // Tell user their password is incorrect.
                        else if (results.length > 0) {
                            res.json({ account: 'wrong-password' })
                        }
                        // If neither the username or password are correct, let user know.
                        else {
                            res.json({ account: 'no-account' })
                        }
                    } catch (err) {
                        next(err)
                    }
                });
            }
        } catch (err) {
            next(err)
        }
    });
});


// Log in with Google API.
var googleUserDetails;
app.post('/api/google-login-attempt', (req, res) => {
    googleUserDetails = jwt.decode(req.body.credential)
    res.redirect('/api/google-login-attempt');
});

app.get('/api/google-login-attempt', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    // Get user id based on Google email, if it exists.
    let sqlQuery1 = "SELECT * FROM users WHERE email = '" + googleUserDetails.email + "';";
    let query1 = conn.query(sqlQuery1, (err, results) => {
        try {
            if (err) {
                throw err;
            }
            // Check if user exists.
            if (typeof results[0] !== 'undefined') {
                // Log user in.        
                req.session.userId = results[0].id
                req.session.userName = results[0].username
                req.session.isAdmin = results[0].is_admin
                res.redirect('/');
            }
            else {
                // Create account.
                var email = googleUserDetails.email
                var username = googleUserDetails.name
                var firstName = googleUserDetails.given_name
                var lastName = googleUserDetails.family_name

                // Log user in.       
                req.session.userName = username
                req.session.isAdmin = 0

                var date_time = new Date();
                let date = ("0" + date_time.getDate()).slice(-2);
                let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
                let year = date_time.getFullYear();
                var currentDate = year + "-" + month + "-" + date
                var startDate = currentDate;

                let data = { first_name: firstName, last_name: lastName, username: username, email: email, is_admin: 0, start_date: startDate };
                let sqlQuery2 = "INSERT INTO users SET ?";
                let query2 = conn.query(sqlQuery2, data, (err, results) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        res.redirect('/');
                    }
                });

            }
        } catch (err) {
            next(err)
        }
    });
});



// Log out.
app.post('/api/logout', (req, res) => {
    // Destroy the user session.
    req.session.destroy();
    res.end()
});



/*
 * Saving and Loading.
 */
// API to get user progress through the games.
app.get('/api/user-progress/:id', function (req, res, next) {
    // Check if the user is logged in.  
    if (req.session.userName) {
        let sqlQuery = `
      SELECT last_slide, module_unlocked
      FROM healthy_lifestyles.users
      WHERE healthy_lifestyles.users.id = ` + req.params.id + `;`;

        let query = conn.query(sqlQuery, (err, results) => {
            try {
                if (err) {
                    throw err;
                }

                res.json(results[0]);
            } catch (err) {
                next(err)
            }
        });
    } else
        res.redirect('/')
});

// Save scene progress.
app.put('/api/save-slide', function (req, res, next) {
    let sqlQuery = "UPDATE users SET last_slide='" + req.body.scene + "' WHERE id = " + req.session.userId + ";";
    let query = conn.query(sqlQuery, (err, results) => {
        try {
            if (err) {
                throw err;
            }
            res.end();
        } catch {
            next(err)
        }
    });
});

// Unlock module.
app.put('/api/unlock-module', function (req, res, next) {
    let sqlQuery = "UPDATE users SET module_unlocked='" + req.body.moduleNum + "' WHERE id = " + req.session.userId + ";";
    let query = conn.query(sqlQuery, (err, results) => {
        try {
            if (err) {
                throw err;
            }
            res.end();
        } catch {
            next(err)
        }
    });
});



// Routes -----------------------------
// The view, which is the SPA Vue app.
const environment = process.env.NODE_ENV;

app.get("/*", async (_req, res) => {
    const data = {
        environment,
        manifest: await parseManifest(),
    };

    res.render("index.html.ejs", data);
});

const parseManifest = async () => {
    if (environment !== "production") return {};

    const manifestPath = path.join(path.resolve(), "dist", "manifest.json");
    const manifestFile = await fs.readFile(manifestPath);

    return JSON.parse(manifestFile);
};


/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results });
}


/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});
