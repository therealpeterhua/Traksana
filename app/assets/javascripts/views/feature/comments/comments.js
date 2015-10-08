Trak.Views.Comments = Backbone.CompositeView.extend({
  template: JST['feature/comments/comments'],
  className: 'comments-top',

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.populateCommentNew();
    this.populateCommentsIndex();

    return this;
  },

  populateCommentNew: function() {
    var commentNewView = new Trak.Views.CommentNew({
      collection: this.model.comments(),
      model: new Trak.Models.Comment({ task_id: this.model.id }),
    });

    this.addSubview('div.new-comment-container', commentNewView);
  },

  populateCommentsIndex: function() {
    var commentsIndexView = new Trak.Views.CommentsIndex({
      collection: this.model.comments()
    });

    this.addSubview('div.comments-index-container', commentsIndexView);
  },

})
