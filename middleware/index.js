// all middleware here
var campground=require("../models/campground");
var comment=require("../models/comment");
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
        if(req.isAuthenticated()){
            campground.findById(req.params.id,function(err,foundCampground){
                    if(err){
                        req.flash("error","campground not found");
                        res.redirect("back");
                    }
                    else{
    
                        if(foundCampground.author.id.equals(req.user._id)){
                        next();
                        }
                        else{
                            req.flash("error","you dont have permission to do that");
                      res.redirect("back");
                        }
                        }
    
    
    
                    
                    });
                
                }
                else{
                    req.flash("error","you need  to be logged in to do that");
                    res.redirect("back");
                }
    
    




}
middlewareObj.checkCommentOwnership=function(req,res,next){
        if(req.isAuthenticated()){
            comment.findById(req.params.comment_id,function(err,foundComment){
                    if(err){
                        res.redirect("back");
                    }
                    else{
    
                        if(foundComment.author.id.equals(req.user._id)){
                        next();
                        }
                        else{
                            req.flash("error","you dont have permission to do that");
               
                            res.redirect("back");
                        }
                        }
    
    
    
                    
                    });
                
                }
                else{
                    req.flash("error","you need  to be logged in to do that");
                    res.redirect("back");
                }
    



}
middlewareObj.isLoggedIn=
function(req,res,next){
    if(req.isAuthenticated()){
    return next();
    }
    req.flash("error","you need to be loggedin to do that ");
    res.redirect("/login");
    }

module.exports=middlewareObj;
