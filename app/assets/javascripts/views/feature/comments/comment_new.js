Trak.Views.CommentNew = Backbone.CompositeView.extend({
  template: JST['feature/comments/comment_new'],
  className: 'new-comment',

  events: {
    'submit form': 'submitComment',
  },

  render: function() {
    var content = this.template({ comment: this.model });
    this.$el.html(content);

    return this;
  },

  submitComment: function(e) {
    e.preventDefault();
    var formAttr = this.$('form').serializeJSON().comment;
    this.model.set(formAttr);

    this.model.save({}, {
      success: function(model) {
        this.collection.add(model);
        console.log("Comment successfully added!");
      }.bind(this)
    });

  },
})
