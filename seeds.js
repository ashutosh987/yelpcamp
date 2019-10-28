var mongoose = require("mongoose");
var campground = require("./models/campground");
var comment= require("./models/comment");

var data = [
    {
        name: "cloud",
        image: "https://image.shutterstock.com/image-photo/portrait-young-beautiful-cute-cheerful-600w-666258808.jpg",
        description: "blah blah sghfahsfhstrhsgjssfjgfjsfbdfbsfgsdfhsfgjfgjfdgjdghjdghjghkgkdgkhghkgdkhgdhjdjgndnhghjhghjhdbalh"

    },
    {
        name: "hlw",
        image: "https://image.shutterstock.com/image-photo/portrait-young-beautiful-cute-cheerful-600w-666258808.jpg",
        description: "blah blah balh"

    },
    {
        name: "cblwd",
        image: "https://image.shutterstock.com/image-photo/portrait-young-beautiful-cute-cheerful-600w-666258808.jpg",
        description: "blah blah balh"

    }




]




function seedDB() {
    ///remove all campground
    campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");


        data.forEach(function (seed) {
            campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("added a campground");
                    //create a cooment
                    comment.create({
                        text: "alsjdbafnalkfnkf",
                        author: "ash"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                        }

                    });




                }

            });
        });





    });
    //add new campround



}
module.exports = seedDB;