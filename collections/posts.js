Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'want', 'have').length > 0);
  }
});

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user(),
      postWithSameLink = Posts.findOne({url: postAttributes.url});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to put up new items");

    // ensure the post has a title
    if (!postAttributes.want || !postAttributes.have)
      throw new Meteor.Error(422, 'Please fill in an item you want or an item you have');

    // check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302,
        'This link has already been posted',
        postWithSameLink._id);
    }

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'url', 'have', 'want'), {
      userId: user._id,
      email: user.emails[0].address,
      submitted: new Date().getTime()
    });

    var postId = Posts.insert(post);

    return postId;
  }
});
