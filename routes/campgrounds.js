var express=require("express");
var router= express.Router();
var campground=require("../models/campground");
var middleware=require("../middleware");


//INDEX ROUTE
router.get("/", function (req, res) {
    campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log(err);

        }
        else {
            res.render("campgrounds/index", { campgrounds: allcampgrounds,currentUser:req.user });
        }

    });


});
///CREATE ROUTE
router.post("/",middleware.isLoggedIn, function (req, res) {
    //get data from form and add to camp array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
   var author={
       id:req.user._id,
       username:req.user.username
   }
   
    var newCampgrounds = { name: name, image: image, description: description,author:author }
    campground.create(newCampgrounds, function (err, newlycreated) {
        if (err) {
            console.log(err);
        } 
        else {
            res.redirect("/campgrounds");
        }

    });

});


//NEW ROUTE
router.get("/new",middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new.ejs");
});



//SHOW ROUTE--for detail about each campgrounds
router.get("/:id", function (req, res) {
    campground.findById(req.params.id).populate("comments").exec(function (err, foundcamp) {

        if (err) {
            console.log(err);

        }
        else {
            console.log(foundcamp);
            res.render("campgrounds/show", { campground: foundcamp });
        }


    });



});

//update campground route
//EDIT canpground route
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
        
        campground.findById(req.params.id,function(err,foundCampground){
               res.render("campgrounds/edit",{campground: foundCampground});
 });
            
 });




 router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
 //find and update
 campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedcampground){
 if(err){
     res.redirect("/campgrounds");
 }
 else{ 
     res.redirect("/campgrounds/"+req.params.id);
 }
 
 });
 //redirect somewhere
 });
 
///destroy campground route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
campground.findByIdAndRemove(req.params.id,function(err){
if(err){
    res.redirect("/camgrounds");

}
else{
    res.redirect("/campgrounds");
}

});

});


 
module.exports=router;