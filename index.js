const express = require('express');
const app = express();
var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');
const s3 = require('./s3');
const s3Url = require('./config.json');
const compression = require('compression');
const bodyparser = require("body-parser");
const db = require("./db");
const { hash, compare } = require("./bcrypt");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

//boilerplate for uploading
var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 3097152
    }
});
//end of boilerplate (do not touch)

app.disable("x-powered-by");

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.use(
    cookieSession({
        secret: "I am always hungry",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

//csurf always after cookieSession and bodyparser
app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});


app.use(express.static('./public'));
app.use(express.static('./uploads'));

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

app.post("/login", (req, res) => {
    db.getUser(req.body.email).then(result => {
        return compare(req.body.password, result.rows[0].password)
            .then(doesMatch => {
                if (doesMatch === true) {
                    req.session.user_id = result.rows[0].user_id;
                    res.json({success: true});
                } else {
                    res.json({success: false});
                }
            }).catch(err => {
                res.json({success: false});
                console.log("error in post login: ", err);
            });
    }).catch(err => {
        res.json({success: false});
        console.log("second error in post login: ", err);
    });
});

//PART 3
app.get("/user", (req, res) => {
    //console.log("GET /user hit!");
    db.getUserData(req.session.user_id
    ).then(resp => {
        //console.log("resp on get /user:", resp);
        res.json(resp.rows[0]);
        //console.log("resp:", resp);
    }).catch(err =>{
        console.log("error in get /user:", err);
    });
});

//ROUTE part4
// app.get("/user/:id.json", function(req, res) {
//     db.getUserData(req.params.id).then(
//         data => res.json(data)
//     );
// });


app.post('/upload', uploader.single('file'), s3.upload, function(req, res) {
    if (req.file) {
        var cUrl = s3Url.s3Url + req.file.filename;
        console.log("cUrl:", cUrl);
        db.addImages(req.session.user_id, cUrl)
            .then(results => {
                res.json(results);
            }).catch(err =>{
                console.log("error in post /upload:", err);
            });
    } else {
        res.json({
            success: false
        });
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

//DON'T TOUCH BELOW:
app.get('/welcome', function(req, res) {
    if (req.session.user_id) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

//this ROUTE should be at THE END!!!!!!!!!!!!!
//this * is to render index.html even if we write a wrong url after localhost8080.
app.get('*', function(req, res) {
    if (!req.session.user_id) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});







app.listen(8080, function() {
    console.log("I'm listening.");
});
