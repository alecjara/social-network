const express = require('express');
const app = express();
//finds repeating words and compresses them to make the file A LOT smaller
const compression = require('compression');
const bodyparser = require("body-parser");
const db = require("./db");
const { hash } = require("./bcrypt");  //I need to add after hash, compare for login
const cookieSession = require("cookie-session");

app.disable("x-powered-by");

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(
    cookieSession({
        secret: "I am always hungry",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(express.static('./public'));

app.use(compression());


if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//here goes the next
//app.get()

app.post("/registration", (req, res) => {
    console.log("req.body in /registration:", req.body);
    //here we have to HASH the password
    //we have to insert first,last,email,hashedpass into the db.js
    //put userId in session
    //send a response
    if (req.body.password != "") {
        hash(req.body.password).then(hash => {
            console.log("hashedpassword in post /registration:", hash);
            return db
                .createUser(
                    req.body.firstname,
                    req.body.lastname,
                    req.body.email,
                    hash);

        }).then(results => {
            console.log("results in post /registration:", results);
            req.session.user_id = results.rows[0].id;
            //console.log(req.session.user_id);
            req.session.firstname = results.rows[0].firstname;
            req.session.lastname = results.rows[0].lastname;
            req.session.email = results.rows[0].email;
            res.json({success: true});
        })
            .catch(function(error) {
                console.log("error in post /registration:", error);
                res.json({success: false});
            });
    } else {
        console.log("please, add a password");
    }

}); //end post registration







//this ROUTE should be at THE END!!!!!!!!!!!!!
//this * is to render index.html even if we write a wrong url after localhost8080.
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


app.listen(8080, function() {
    console.log("I'm listening.");
});
