Trak.Views.CommentsIndexItem = Backbone.View.extend({
  template: JST['feature/comments/comments_index_item'],
  className: 'comments-index-item',
  tagName: 'li',

  initialize: function() {
    this.listenTo(this.model, 'sync change', this.render);
  },

  render: function() {
    var content = this.template({
      comment: this.model,
      author: this.model.author(),
    })
  },
})
