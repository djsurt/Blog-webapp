//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "This is my blog webapp. I built this app to test my skills in express.js and templating using ejs. To start composing a post, go to localhost:3000/compose or simply click the compose button.";
const aboutContent = "Just some lorem ipsum Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Some more lorem impsum Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postsArr = [];

app.get("/", (req, res) => {
  res.render("home", {homeContent:homeStartingContent, allPosts: postsArr});
});

app.get('/about', (req, res) => {
  res.render("about", {abtContent:aboutContent});
});

app.get('/contact', (req, res) => {
  res.render("contact", {cntctContent:contactContent});
});

app.get('/compose', (req, res) => {
  res.render("compose");
});

app.get('/posts/:post', (req, res) => {
  for(let i = 0; i < postsArr.length; ++i){
    if(_.lowerCase(postsArr[i].title) === _.lowerCase(req.params.post)){
      res.render("post", {postTitle: postsArr[i].title, postBody: postsArr[i].body});
      break;
    }
    else{
      console.log("Match not found");
    }
  }
});

app.post('/contact', (req, res) => {
  let post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };
  postsArr.push(post);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
