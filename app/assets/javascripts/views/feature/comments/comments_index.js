Trak.Views.CommentsIndex = Backbone.CompositeView.extend({
  template: JST['feature/comments/comments_index'],
  className: 'comments-index',

  initialize: function() {
    this.listenTo(this.collection, "sync add remove change", this.render);
  },

  render: function() {
    var content = this.template({ comments: this.collection });
    this.$el.html(content);
    this.addIndexItems();

    return this;
  },

  addIndexItems: function() {
    debugger;
    this.collection.each( function(comment) {
      var commentItemView = new Trak.Views.CommentsIndexItem({
        model: comment
      });

      this.addSubview('ul.comments-index-items', commentItemView);
    }.bind(this) );
  },
})
