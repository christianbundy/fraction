Meteor.startup(function () {
  var addPostQueue = new PowerQueue();

  prediction = Meteor.require('predictionio')({

  });

  var errorOrResult = function (err, res) {
    console.log(err, res);
  }

  var addPost = function (post) {
    "use strict";
    addPostQueue.add(function(done) {
      prediction.items.create({
        "pio_iid": post._id,
        "pio_itypes": 'post'
      }, errorOrResult);
      done();
    });
  };

  Posts.find().fetch().forEach(addPost);
})
