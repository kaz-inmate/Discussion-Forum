const User = require('../model/User')
const Post = require('../model/Post');
const Comment = require('../model/Commens');


exports.admin_page = (req, res) => {
    User.find({'checked': false}).then(found => {
        Post.find({$where: "this.reports.length > 1"}).then(data => {
            res.render('admin.ejs', {req:req, username:req.user.username, admin:req.user.admin, found:found, data:data});
            console.log(data)    
        }).catch(err => {
            if(err) {
                throw err;
            }
        })     
    })
    .catch(err => {
        if(err) {
            throw err;
        }
    }); 
}

exports.user_accept = (req, res) => {
    User.updateOne({"_id":req.params.id}, {$set: {checked: "true"}}).then(success => {
        res.redirect("/admin");
    })
    .catch(err => {
        if(err) {
            throw err;
        }
    });
}


exports.user_delete = (req, res) => {
    User.deleteOne({'_id': req.params.id}, (err => {
        if(err) {
            console.log(err);
        }
        res.send("Success");
    })
    )
}

exports.post_notices = (req, res) => {
    const {title, descrip} = req.body;

    const newNotice = new Notice({title, descrip});
    newNotice.save()  
      .then(posts => {
        console.log('Notice saved');
        res.redirect('/admin');
      })
      .catch(err => {
        if(err) throw err;
      });
}

exports.delete_reported_post = (req, res) => {
    Post.deleteOne({'_id': req.params.id}, (err => {
        if(err) {
            console.log(err);
        }
        res.send("Success");
    })
    )
}