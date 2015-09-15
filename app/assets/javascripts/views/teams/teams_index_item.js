Trak.Views.TeamsIndexItem = Backbone.View.extend({
  template: JST['teams/teams_index_item'],
  tagName: 'li',

  render: function() {
    var content = this.template({team: this.model});
    this.$el.html(content);

    return this;
  }
})
