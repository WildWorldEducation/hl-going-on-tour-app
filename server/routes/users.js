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
    user: 'admin',
    password: 'H3@lthyL1f35tyl3s',
    //password: 'password',
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

/**
 * List Items
 *
 * @return response()
 */
router.get('/api/list', function (req, res, next) {
    // Check if the user is logged in and an admin.   
    //if (req.session.userName && req.session.isAdmin == 1) {
    if (req.session.userName) {
        res.setHeader('Content-Type', 'application/json');
        let sqlQuery = "SELECT * FROM healthy_lifestyles.users;";
        let query = conn.query(sqlQuery, (err, results) => {
            try {
                if (err) {
                    throw err;
                }
                else {
                    res.json(results);
                }
            } catch (err) {
                next(err)
            }
        });
    }
    else
        res.redirect('/')
});


/**
 * Create New Item
 *
 * @return response()
 */
router.post('/api/add', (req, res, next) => {
    if (req.session.userName) {
        let data = {
            first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, email: req.body.email,
            password: req.body.password, start_date: req.body.current_date
        };

        // Check if username or email address already exist.
        let sqlQuery1 = "SELECT * FROM users WHERE username = '" + req.body.username + "';";
        let query1 = conn.query(sqlQuery1, (err, results) => {
            try {
                if (err) {
                    throw err;
                }
                if (results.length > 0) {
                    res.json({ notification: 'username already taken' })
                }
                else {

                    let sqlQuery2 = "SELECT * FROM users WHERE email = '" + req.body.email + "';";
                    let query2 = conn.query(sqlQuery2, data, (err, results) => {
                        try {
                            if (err) {
                                throw err;
                            }
                            else {
                                if (results.length > 0) {
                                    res.json({ notification: 'email already taken' })
                                }
                                else {
                                    // If not, add to database.
                                    let sqlQuery3 = "INSERT INTO users SET ?";
                                    let query3 = conn.query(sqlQuery3, data, (err, results) => {
                                        try {
                                            if (err) {
                                                throw err;
                                            }
                                            else {
                                                res.json({ notification: 'account created' })
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
                }
            } catch (err) {
                next(err)
            }
        });
    }
    else {
        res.redirect('/login');
    }
});

/**
 * Update User
 *
 * @return response()
 */
router.put('/api/:id/edit', (req, res, next) => {
    if (req.session.userName) {
        // Check if username or email address already exist.
        let sqlQuery1 = `SELECT * FROM users 
        WHERE username = '` + req.body.username +
            `' AND email <> '` + req.body.original_email + `';`;
        let query1 = conn.query(sqlQuery1, (err, results) => {
            try {
                if (err) {
                    throw err;
                }
                if (results.length > 0) {
                    res.json({ notification: 'username already taken' })
                }
                else {

                    let sqlQuery2 = `SELECT * FROM users 
                    WHERE email = '` + req.body.email +
                        `' AND username <> '` + req.body.original_username + `';`;
                    let query2 = conn.query(sqlQuery2, (err, results) => {
                        try {
                            if (err) {
                                throw err;
                            }
                            else {
                                if (results.length > 0) {
                                    res.json({ notification: 'email already taken' })
                                }
                                else {
                                    // If not, add to database.
                                    let sqlQuery3 = "UPDATE users SET first_name='" + req.body.firstname + "', last_name = '" + req.body.lastname + "', username = '" + req.body.username + "', email = '" + req.body.email + "', password = '" + req.body.password + "' WHERE id=" + req.params.id;
                                    let query = conn.query(sqlQuery3, (err, results) => {
                                        try {
                                            if (err) {
                                                throw err;
                                            }
                                            res.json({ notification: 'account edited' })
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
                }
            } catch (err) {
                next(err)
            }
        });
    }
    else {
        res.redirect('/login');
    }
});

/**
 * Show Item
 *
 * @return response()
 */
router.get('/api/:id', (req, res, next) => {
    if (req.session.userName) {
        res.setHeader('Content-Type', 'application/json');

        let sqlQuery = `
        SELECT *
        FROM users
        WHERE users.id = ` + req.params.id + `;`;

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
    }
    else {
        res.redirect('/login');
    }
});

/**
 * Delete Item
 *
 * @return response()
 */
router.delete('/api/:id', (req, res, next) => {
    if (req.session.userName) {
        let sqlQuery = "DELETE FROM users WHERE id=" + req.params.id;

        let query = conn.query(sqlQuery, (err, results) => {
            try {
                if (err) {
                    throw err;
                }
            } catch (err) {
                next(err)
            }
        });
    }
    else {
        res.redirect('/login');
    }
});

/**
 *  Create account
 *
 * @return response()
 */
router.post('/api/create-account', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    // Check if username already exits.
    let sqlQuery1 = "SELECT * FROM users WHERE users.username = '" + req.body.username + "';";
    let query1 = conn.query(sqlQuery1, (err, results) => {
        try {
            if (err) {
                throw err;
            }
            else {
                if (results.length > 0) {
                    res.json({ notification: 'username already exists' });
                }
                else {
                    // Check if email address already exits.
                    let sqlQuery2 = "SELECT * FROM users WHERE users.email = '" + req.body.email + "';";
                    let query2 = conn.query(sqlQuery2, (err, results) => {
                        if (results.length > 0) {
                            res.json({ notification: 'email address already exists' });
                        }
                        else {
                            // Create account and redirect to login screen.
                            let data = { first_name: req.body.first_name, last_name: req.body.last_name, username: req.body.username, password: req.body.password, email: req.body.email, is_admin: 0, start_date: req.body.current_date };
                            let sqlQuery3 = "INSERT INTO users SET ?";
                            let query = conn.query(sqlQuery3, data, (err, results) => {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    res.json({ notification: 'account created' });
                                    res.end();
                                }
                            });
                        }
                    });
                }
            }
        } catch (err) {
            next(err)
        }
    })
});

module.exports = router 