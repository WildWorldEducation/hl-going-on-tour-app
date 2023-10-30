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

/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'C0ll1ns1n5t1tut32022',
    password: 'password',
    database: 'skill_tree'
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
