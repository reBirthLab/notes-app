var express = require('express');
var app = express();
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(session({
    store: new MongoStore({
        url: 'mongodb://localhost:27017/ang4_session'
    }),
    secret: 'ang4_notes',
    resave: true,
    saveUninitialized: true
}));

var mongoClient = require("mongodb").MongoClient;
var dbConnectionUrl = 'mongodb://localhost:27017';
var db;

mongoClient.connect(dbConnectionUrl, function (err, dbase) {
    console.log("Connected to " + dbConnectionUrl);
    db = dbase.db("ang4_notes");

    initDB();
});

//app.use(express.static("./public"));

var initDB = function () {
    db.collection('users', function (error, users) {
        db.users = users;
    });

    db.collection('sections', function (error, sections) {
        db.sections = sections;
    });

    db.collection('notes', function (error, notes) {
        db.notes = notes;
    });

    db.users.find({})
        .toArray(function (err, users) {
            if (users.length < 1) {
                db.users.insert({ name: 'demo', password: '123' });
                db.sections.insert({ title: 'Private', user: 'demo' });

                console.log("DB initialized with user: demo")
            }
        });
};

// not needed if we use proxy of this server
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.all('*', function (req, res, next) {
    // console.log(req.session);
    console.log(req.sessionID);
    next();
});

app.get("/api/notes", function (req, res) {
    console.log("#notes: " + req.query.section);

    var user = req.session.user;
    var section = req.query.section;

    db.notes.find({ user: user.name, section: section })
        .toArray(function (err, items) {
            res.send(items);
        });

    // for (var n in notes)
    // {
    //     if (section == notes[n].section)
    //     {
    //         toSend.push(notes[n]);
    //     }
    // }

    // res.send(toSend);
});

app.post("/api/notes", function (req, res) {
    // ???
    var note = req.body;

    db.notes.insert(note);

    res.end();
});

app.get("/api/sections", function (req, res) {
    console.log("#sections: " + JSON.stringify(req.session));

    var user = req.session.user;

    db.sections.find({ user: user.name })
        .toArray(function (err, items) {
            res.send(items);
        });
});

app.post("/api/sections/replace", function (req, res) {
    if (req.body.length == 0) {
        resp.end();
    }

    // ???
    var user = req.session.user;

    db.sections.remove({ user: user.name }, function (err, resp) {
        if (err) {
            console.log(err);
            res.end();
        }

        db.sections.insertMany(req.body, function (err, resp) {
            res.end();
        });
    });



    // req.session.sections = req.body;

    // db.users.find({})
    //     .toArray(function (err, users)
    //     {
    //         console.log('--> check user: ' + (!users.map(u => u.name).find(u => u === user)));
    //         res.send(!users.map(u => u.name).find(u => u === user));
    //     });
    //
    res.send();

});

app.post("/api/users", function (req, res) {
    var user = req.body;

    db.users.insert(user);
    db.sections.insert({ title: 'Private', user: user.name });

    console.log('--> user added: ' + JSON.stringify(user));

    res.end();
});

app.get("/api/checkUserUnique", function (req, res) {
    var user = req.query.user;

    db.users.find({})
        .toArray(function (err, users) {
            console.log('--> check user: ' + (!users.map(u => u.name).find(u => u === user)));
            res.send(!users.map(u => u.name).find(u => u === user));
        });
});

app.post("/api/login", function (req, res, next) {
    console.log("#login");

    var username = req.body.username;
    var password = req.body.password;

    var currentUser = null;

    db.users.find({})
        .toArray(function (err, users) {
            for (var u in users) {
                console.log(JSON.stringify(users));
                if (username == users[u].name && password == users[u].password) {
                    currentUser = users[u];               
                    res.send(currentUser != null);
                    req.session.user = currentUser;
                }
            }
        });
});

app.get("/api/logout", function (req, res) {
    console.log("#logout");

    req.session.user = null;

    res.end();
});

// -----------------------------------------------------------
// uncomment this method
// in case when we use only this server, no angular-cli server
// -----------------------------------------------------------
//
/* app.get("*", function (req, res, next) {
    res.sendFile('index.html', { root: "./public" });
}); */


app.listen(8080);

console.log("--> server started on port 8080");

