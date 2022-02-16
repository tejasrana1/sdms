const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'))
app.set("view engine", "ejs");
var wrongInput = "";
var wrongInputS = "SignUp";
mongoose.connect('mongodb://localhost:27017/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var marks = [{
  subject: "Subject",
  om: "Obtained Marks",
  tm: "Total Marks",
  description: "Description"
}];
var userSchema = {
  name: String,
  email: String,
  number: Number,
  username: String,
  password: String
}
var user = mongoose.model("user", userSchema);


app.get("/", function(req, res) {
  res.render("index", {
    wrongInput: wrongInput
  });
})

app.post("/", function(req, res) {
  user.findOne({
    username: req.body.username
  }, function(err, found) {
    if (found) {
      if (found.password == req.body.password) {
        res.render("main", {
          name: found.name
        })
      } else {
        wrongInput = "Wrong Password";
        res.redirect("/");
      }
    } else {
      wrongInput = "User Not Found";
      res.redirect("/");
    }
  })
})

app.post("/signup", function(req, res) {
  var wrongInputS = "SignUp";

  res.render("signup", {
    wrongInputS: wrongInputS
  })
})
app.get("/signup", function(req, res) {
  res.render("signup", {
    wrongInputS: wrongInputS
  })
})
app.post("/complete", function(req, res) {
  user.findOne({
    username: req.body.username
  }, function(err, found) {
    if (found) {
      wrongInputS = "Username Already in use";
      res.redirect("/signup");
    } else {
      var newUser = new user({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        username: req.body.username,
        password: req.body.password
      });
      newUser.save();
      res.redirect("/");
    }
  })
})

var marksSchema = {

  subject: String,
  name: String,
  om: Number,
  tm: Number,
  description: String
}
var marks = mongoose.model("mark", marksSchema);
var getName = "";
app.get("/marks", function(req, res) {
  console.log(getName);
  marks.find({
    name: getName
  }, function(err, foundItems) {
    res.render("marks", {
      getName: getName,
      marks: foundItems
    });
  });
})
app.post("/marks", function(req, res) {
  getName = req.body.name;
  console.log(getName);
  var newMark = new marks({

    subject: req.body.subject,
    name: req.body.name,
    om: req.body.om,
    tm: req.body.tm,
    description: req.body.description
  });
  newMark.save();
  res.redirect("/marks");
})








var chatSchema = {
  name: String,
  message: String
}
var chat = mongoose.model("chat", chatSchema);
var chatName = "";
app.get("/chat", function(req, res) {
  console.log(chatName);
  chat.find({}, function(err, foundItems) {
    res.render("chat", {
      name: chatName,
      message: foundItems
    });
  });
})
app.post("/chat", function(req, res) {
  chatName = req.body.name;
  var newChat = new chat({
    name: req.body.cname,
    message: req.body.msg
  })
  newChat.save();
  res.redirect("/chat");
})






app.listen(3000, function() {
  console.log("Server Running on port 3000");
})
