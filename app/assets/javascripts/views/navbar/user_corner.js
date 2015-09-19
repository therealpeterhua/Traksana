Trak.Views.UserCorner = Backbone.View.extend({
  template: JST['navbar/user_corner'],
  className: 'user-corner',

  initialize: function() {
    this.listenTo(Trak.currentUser, 'sync', this.render);
  },

  render: function() {
    debugger;
    var content = this.template({currentUser: Trak.currentUser});
    this.$el.html(content);

    return this;
  }
})
