var express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  server = app.listen(3000 || process.env.PORT, listening),
  bodyParser = require("body-parser"),
  flash = require("connect-flash"),
  passport = require("passport"),
  methodOverride = require("method-override"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user"),
  campground = require("./models/campground.js"),
  comment = require("./models/comment"),
  seedDB = require("./seeds");

//requiring routes

var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
//var mongoURI = "mongodb://localhost:27017/yelp_camp";
var mongoURI =
  "mongodb+srv://ashutosh:ashu@firstcluster-qp4ft.mongodb.net/test?retryWrites=true&w=majority";
// "mongodb://localhost:27017/yelp_";
mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
//schema setup
//seedDB();
app.use(flash());
//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "hello honest person ashutosh",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

function listening() {
  console.log("server is running");
}
