Trak.Views.Titlebar = Backbone.View.extend({
  template: JST['titlebar/titlebar'],
  className: 'title',

  initialize: function(options) {
    this.currTeamMoniker = options.currTeamMoniker;
    if (this.model) {
      this.listenTo(this.model, 'sync', this.render);
    }
  },

  render: function() {
    var content = this.template({
      project: this.model,
      currTeamMoniker: this.currTeamMoniker
    });
    this.$el.html(content);

    return this;
  }
})
