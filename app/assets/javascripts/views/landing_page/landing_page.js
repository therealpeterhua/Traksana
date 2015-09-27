Trak.Views.LandingPage = Backbone.View.extend({
  template: JST['landing_page/landing_page'],

  render: function() {
    var content = this.template();
    this.$el.html(content);

    return this;
  },
})
