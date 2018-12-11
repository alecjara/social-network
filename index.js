const express = require('express');
const app = express();
//socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });

var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');
const s3 = require('./s3');
const s3Url = require('./config.json');
const compression = require('compression');
const bodyparser = require("body-parser");
const db = require("./db");
const { hash, compare } = require("./bcrypt");
//const cookieSession = require("cookie-session");
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


//cookiesession for socket.io
const cookieSession = require('cookie-session');
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always hungry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
//end of cookieSession for sockets

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

});

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



app.post('/upload', uploader.single('file'), s3.upload, (req, res) => {
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

app.post('/bio', (req, res) => {
    //console.log("post bio:", req.body);
    db.updateBio(req.session.user_id, req.body.bio
    ).then(resp => {
        console.log("resp in post /bio:", resp);
        res.json({
            user_id: req.session.user_id,
            bio: resp.rows[0].bio
        });
    }).catch(err =>{
        console.log("error in post /bio:", err);
        res.json({
            success: false
        });
    });
});


app.get("/user/:id/info", (req, res) => {
    //console.log("get id.json:", req.params);
    db.otherPersonProfile(req.params.id).then(data =>
        res.json({ user_id: req.session.user_id, data: data
        })
    ).catch(err =>{
        res.json({
            success: false
        });
        console.log("error indexjs in get /user id:", err);
    });
});

app.get("/friends/:id", (req, res) => {
    //console.log("my id:", req.session.user_id); //sender
    //console.log("friends id:", req.params.id); //receiver
    db.friendButton(req.params.id, req.session.user_id).then(data =>
        res.json(data)
    ).catch(err =>{
        res.json({
            success: false
        });
        console.log("error indexjs in get /friends id:", err);
    });
});

app.post("/friends2/:id", (req, res) => {
    db.sendButton(req.params.id, req.session.user_id).then(() => {
        //console.log("data in friends2:", data);
        res.json({success: true});
    }).catch(err =>{
        res.json({
            success: false
        });
        console.log("error indexjs in post /friends2 id:", err);
    });
});

app.post("/cancelfriends/:id", (req, res) => {
    db.cancelButton(req.params.id, req.session.user_id).then(() => {
        //console.log("data cancelfriend:", data);
        res.json({success: true});
    }).catch(err =>{
        res.json({
            success: false
        });
        console.log("error indexjs in post / cancelfriends:", err);
    });
});

app.post("/acceptfriends/:id", (req, res) => {
    console.log("post acceptfriends");
    db.acceptButton(req.session.user_id, req.params.id).then((data) => {
        //console.log("data acceptfriend2", data);
        res.json({success: true});
    }).catch(err =>{
        res.json({
            success: false
        });
        console.log("error indexjs in post / acceptfriends:", err);
    });
});

app.post("/deletefriends/:id", (req, res) => {
    db.deleteButton(req.params.id, req.session.user_id).then(() => {
        //console.log("data acceptfriend:", data);
        res.json({success: true});
    }).catch(err =>{
        res.json({
            success: false
        });
        console.log("error indexjs in post / deletefriends:", err);
    });
});

//part7 redux
app.get('/friendslist', (req, res) => {
    //console.log("get lists, req.session.user_id", req.session.user_id);
    db.lists(req.session.user_id).then((data) => {
        //console.log("Data.rows in get friendslist:", data);
        res.json(data.rows);
    }).catch(err =>{
        res.json({
            success: false
        });
        console.log("error indexjs in get / friendslist:", err);
    });
});

//DON'T TOUCH BELOW:
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.get('/welcome', function(req, res) {
    if (req.session.user_id) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

//this ROUTE should be at THE END!!!!!!!!!!!!!
app.get('*', function(req, res) {
    if (!req.session.user_id) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

//for socket.io we changed app.listen to server.listen
server.listen(8080, function() {
    console.log("I'm listening.");
});

//make sure this is the end of everything:
//onlineUsers object will be responsible for maintaining a list of onlineusers
let onlineUsers = {};

io.on("connection", socket => {
    console.log(`User with socket id ${socket.id} just connected`);
    let socket_id = socket.id;
    let user_id = socket.request.session.user_id;
    //console.log("socket session info:", user_id);
    onlineUsers[socket_id] = user_id;
    //console.log("onlineUsers:", onlineUsers);
    let arrOfIds = Object.values(onlineUsers);
    //console.log("arrOfIds:", arrOfIds);
    //needs two arguments: 1 "name of mess in string", 2 any data (data from query, result from api...)
    db.getUserByIds(arrOfIds).then(results => {
        //console.log("results:", results);
        socket.emit("onlineUsers", results.rows);
        //to pass a db.query db.getUser(user_id).then(results => { socket.emit("catnip", results); });
    }).catch(err => {
        console.log("error in getUserByIds:", err);
    });

    if (arrOfIds.filter(id => id == user_id).length == 1) {
        console.log("arrOfIdsFilter to get id:", user_id);

        db.getJoinedId(user_id).then(results => {
            socket.broadcast.emit("userJoined", results.rows[0]);
        }).catch(err => {
            console.log("error in getJoinedId:", err);
        });
    }

    //---
    //when a user disconnects:
    socket.on("disconnect", () => {
        delete onlineUsers[socket_id];
        io.sockets.emit("userLeft", user_id);
        console.log(`socket user_id ${ socket_id} just disconnected`);
        //we need to figure out if the user has actually left the web or closed one tab.
        //we only want to fire if the user has loggedout for sure!!!!
    });
});
