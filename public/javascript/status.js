$(document).ready(function() {
    $('#delete-btn').on("click", function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:"DELETE",
            url: '/admin/delete/' + id,
            success: function(res) {
                alert("Deleting User");
               location.reload(true);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });


    $('#delReport-post').on("click", function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:"DELETE",
            url: '/admin/report/' + id,
            success: function(res) {
                alert("Deleting Post");
               location.reload(true);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });



    //delete own post
    $('#deluser-post').on("click", function(e) {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:"DELETE",
            url: '/posts/delete/' + id,
            success: function(res) {
                alert("Deleting Post");
                window.location.href = "/home";
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
    
});