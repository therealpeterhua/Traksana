Trak.Views.TeamsIndex = Backbone.View.extend({
  //PH** - transform into composite view
  template: JST['teams/team_index'],

  render: function() {
    var content = this.template({teams: this.collection});
    this.$el.html(content);

    return this;
  }
})
