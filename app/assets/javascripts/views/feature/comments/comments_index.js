Trak.Views.CommentsIndex = Backbone.CompositeView.extend({
  template: JST['feature/comments/comments_index'],
  className: 'comments-index',

  initialize: function() {
    this.listenTo(this.collection, "add remove", this.render);
    //PH - don't need sync here -- we only render this *after* fetching from server anyway
  },

  render: function() {
    var content = this.template({ comments: this.collection });
    this.$el.html(content);
    this.addIndexItems();

    return this;
  },

  addIndexItems: function() {
    if (this.collection.models.length === 0) {
      this.addNoCommentsMessage();
      return;
    }

    this.collection.each( function(comment) {
      var commentItemView = new Trak.Views.CommentsIndexItem({
        model: comment
      });

      this.addSubview('ul.comments-index-items', commentItemView);
    }.bind(this) );
  },

  addNoCommentsMessage: function() {
    var message = $('<p class="no-comments-message">No comments so far...</p>')
    this.$el.append(message);
  },
})
