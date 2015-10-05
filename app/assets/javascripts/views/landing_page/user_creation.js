Trak.Views.UserCreation = Backbone.View.extend({
  template: JST['landing_page/user_creation'],
  className: 'user-creation',

  initialize: function() {
    this.model = new Trak.Models.User();
  },

  render: function() {
    var content = this.template({user: this.model});
    this.$el.html(content);

    return this;
  },

})
