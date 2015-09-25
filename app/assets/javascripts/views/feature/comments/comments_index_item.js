Trak.Views.CommentsIndexItem = Backbone.View.extend({
  template: JST['feature/comments/comments_index_item'],
  className: 'comments-index-item group',
  tagName: 'li',

  events: {
    'click div.comment-deletion': 'deleteComment',
    'mouseenter': 'toggleButtons',
    'mouseleave': 'toggleButtons',
  },

  initialize: function() {
    this.listenTo(this.model, 'sync change', this.render);
  },

  render: function() {
    var content = this.template({
      comment: this.model,
      author: this.model.author(),
    });
    this.$el.html(content);

    return this;
  },

  deleteComment: function(e) {
    this.model.destroy();
  },

  toggleButtons: function(e) {
    this.$('div.comment-deletion').toggleClass('transparent');
  }
})
