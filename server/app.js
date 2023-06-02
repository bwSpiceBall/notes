const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const pool = require('./sqlConnection');
const router = express.Router();

passport.use(
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        },
        function (username, password, done) {
            // Look up the user in the database and compare passwords
            pool.query('SELECT * FROM users WHERE username = $1', [username], (err, res) => {
                if (err) {
                    return done(err);
                }
                const user = res.rows[0];
               
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (password !== user.password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }
    )
);

// Define the serializeUser and deserializeUser functions
passport.serializeUser(function(user, done) {
  console.log('Serializing user', user);
  done(null, user);
});


passport.deserializeUser(async function (id, done) {
    console.log('Deserialising user result');
    const client = await pool.connect();
    const result = client.query(`SELECT * FROM users WHERE id = $1`, [id]); 
    done(null, result);
});

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
    })
);




router.get('/', (req, res) => {
    res.send('Hello, world! App route');
});

// Set up routes
app.use('/', routes);

// Set up error handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
