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


// Show one specific user.
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
 * Update User
 *
 * @return response()
 */
router.put('/api/:id/edit', (req, res, next) => {
    if (req.session.userName) {
        let sqlQuery = "UPDATE users SET first_name='" + req.body.firstname + "', last_name = '" + req.body.lastname + "', username = '" + req.body.username + "', email = '" + req.body.email + "', password = '" + req.body.password + "' WHERE id=" + req.params.id;
        let query = conn.query(sqlQuery, (err, results) => {
            try {
                if (err) {
                    throw err;
                }
                res.end();
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



module.exports = router 