$(document).ready(function() {
  $(".upvote-post").on('click',function(e) {
    e.preventDefault();
    let query  = $(this).closest('article');
    let votes = query.find('.vote-text');
    let downVote = query.find('.downvote-post');

    let counter;

    var postId = $(this).data("id");

    if (downVote.hasClass("is-liked")) {
      downVote.removeClass("is-liked");
      $(this).addClass("is-liked");
      counter = votes.text();
      votes.text(++counter);

      $.ajax({
        type: "PUT",
        url: "/" + postId + "/vote-up",
        data: {
          vote: counter,
          state: "upDown"
        },

        success: function(data) {
          console.log("voted up!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });

    } else if ($(this).hasClass("is-liked")) {
      counter = votes.text();
      votes.text(--counter);
      $(this).removeClass("is-liked");

      $.ajax({
        type: "PUT",
        url: "/" + postId + "/vote-up",
        data: {
          vote: counter,
          state: "none"
        },
        success: function(data) {
          console.log("voted up!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });

    }  else if (!$(this).hasClass("is-liked")) {
      counter = votes.text();
      votes.text(++counter);
      $(this).addClass("is-liked");

      $.ajax({
        type: "PUT",
        url: "/" + postId + "/vote-up",
        data: {
          vote: counter,
          state: "up"
        },

        success: function(data) {
          console.log("voted up!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });

    } 


   
   
    
  });

  $(".downvote-post").on('click',function(e) {
    e.preventDefault();
    let query  = $(this).closest('article');
    let votes = query.find('.vote-text');
    let upvote = query.find('.upvote-post');

    let counter;
    var postId = $(this).data("id");

    if(upvote.hasClass("is-liked")) {
      upvote.removeClass("is-liked");
      $(this).addClass("is-liked");
      counter = votes.text();
      votes.text(--counter);

  $.ajax({
    type: "PUT",
    url: "/" + postId + "/vote-down",
    data: {
      vote: counter,
      state: "downUp"
    },

    success: function(data) {
      console.log("voted down!");
    },
    error: function(err) {
      console.log(err.messsage);
    }
  });

} else if ($(this).hasClass("is-liked")) {
      counter = votes.text();
      votes.text(++counter);
      $(this).removeClass("is-liked");

      $.ajax({
        type: "PUT",
        url: "/" + postId + "/vote-down",
        data: {
          vote: counter,
          state: "none"
        },
        success: function(data) {
          console.log("voted down!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });

    }  else if (!$(this).hasClass("is-liked")) {
      counter = votes.text();
      votes.text(--counter);
      $(this).addClass("is-liked");

      $.ajax({
        type: "PUT",
        url: "/" + postId + "/vote-down",
        data: {
          vote: counter,
          state: "down"
        },

        success: function(data) {
          console.log("voted down!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });

    } 
  });

  $(".upvote-comment").on('click',function(e) {
    e.preventDefault();

  let query  = $(this).closest('article');
  let votes = query.find('.comment-text');
  let downComment = query.find('.downvote-comment');

  let counter;

  var commentId = $(this).data("id");


  if (downComment.hasClass("is-liked")) {
    downComment.removeClass("is-liked");
    $(this).addClass("is-liked");
    counter = votes.text();
    votes.text(++counter);

    $.ajax({
      type: "PUT",
      url:  "/posts/" + commentId + "/vote-up",
      data: {
        vote: counter,
        state: "upDown"
      },

      success: function(data) {
        console.log("voted up!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });

  } else if ($(this).hasClass("is-liked")) {
    counter = votes.text();
    votes.text(--counter);
    $(this).removeClass("is-liked");

    $.ajax({
      type: "PUT",
      url: "/posts/" + commentId + "/vote-up",
      data: {
        vote: counter,
        state: "none"
      },
      success: function(data) {
        console.log("voted up!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });

  }  else if (!$(this).hasClass("is-liked")) {
    counter = votes.text();
    votes.text(++counter);
    $(this).addClass("is-liked");

    $.ajax({
      type: "PUT",
      url:"/posts/" + commentId + "/vote-up",
      data: {
        vote: counter,
        state: "up"
      },

      success: function(data) {
        console.log("voted up!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });

  } 


 
 
  
});

$(".downvote-comment").on('click',function(e) {
  e.preventDefault();
  let query  = $(this).closest('article');
  let votes = query.find('.comment-text');
  let upvote = query.find('.upvote-comment');

  let counter;
  var commentId = $(this).data("id");

  if(upvote.hasClass("is-liked")) {
    upvote.removeClass("is-liked");
    $(this).addClass("is-liked");
    counter = votes.text();
    votes.text(--counter);

$.ajax({
  type: "PUT",
  url: "/posts/" + commentId + "/vote-down",
  data: {
    vote: counter,
    state: "downUp"
  },

  success: function(data) {
    console.log("voted down!");
  },
  error: function(err) {
    console.log(err.messsage);
  }
});

} else if ($(this).hasClass("is-liked")) {
    counter = votes.text();
    votes.text(++counter);
    $(this).removeClass("is-liked");

    $.ajax({
      type: "PUT",
      url:  "/posts/" + commentId + "/vote-down",
      data: {
        vote: counter,
        state: "none"
      },
      success: function(data) {
        console.log("voted down!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });

  }  else if (!$(this).hasClass("is-liked")) {
    counter = votes.text();
    votes.text(--counter);
    $(this).addClass("is-liked");

    $.ajax({
      type: "PUT",
      url:   "/posts/" + commentId + "/vote-down",
      data: {
        vote: counter,
        state: "down"
      },

      success: function(data) {
        console.log("voted down!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });

  }

});
});