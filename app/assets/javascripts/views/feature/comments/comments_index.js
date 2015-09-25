Trak.Views.CommentsIndex = Backbone.CompositeView.extend({
  template: JST['feature/comments/comments_index'],
  className: 'comments-index',

  initialize: function() {
    this.listenTo(this.collection, "add remove change", this.render);
    //PH - don't need sync here -- we only render this *after* fetching from server anyway
  },

  render: function() {
    var content = this.template({ comments: this.collection });
    this.$el.html(content);
    this.addIndexItems();

    return this;
  },

  addIndexItems: function() {
    this.collection.each( function(comment) {
      var commentItemView = new Trak.Views.CommentsIndexItem({
        model: comment
      });

      this.addSubview('ul.comments-index-items', commentItemView);
    }.bind(this) );
  },
})
