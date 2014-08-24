Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val().toUpperCase(),
      have: $(e.target).find('[name=have]').val(),
      want: $(e.target).find('[name=want]').val(),
    }

    Meteor.call('post', post, function(error, id) {
      if (error)
        return alert(error.reason);

        Router.go('postsList', {_id: id});
    });
  }
});
