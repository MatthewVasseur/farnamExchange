if (Posts.find().count() === 0) {
  Posts.insert({
    url: 'Question?',
    have: 'Send an email to',
    want: 'Matthew Vasseur',
    email: 'matthew.vasseur@yale.edu'
  });

}
