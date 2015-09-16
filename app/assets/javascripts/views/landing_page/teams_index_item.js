Trak.Views.TeamsIndexItem = Backbone.View.extend({
  template: JST['landing_page/teams_index_item'],
  tagName: 'li',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({team: this.model});
    this.$el.html(content);

    return this;
  }
})
