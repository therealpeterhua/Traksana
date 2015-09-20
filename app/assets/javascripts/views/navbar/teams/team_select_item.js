Trak.Views.TeamSelectItem = Backbone.View.extend({
  template: JST['navbar/teams/team_select_item'],
  className: 'team-select-item',
  tagName: 'li',

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function() {
    var content = this.template({ team: this.model });
    this.$el.html(content);

    return this;
  }
})
