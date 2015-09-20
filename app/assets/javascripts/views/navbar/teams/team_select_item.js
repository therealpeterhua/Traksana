Trak.Views.TeamSelectItem = Backbone.View.extend({
  template: JST['navbar/teams/team_select_item'],
  className: 'team-select-item',
  tagName: 'li',

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.$el.data('team-id', this.model.id);
  },

  render: function() {
    var content = this.template({ team: this.model });
    this.$el.html(content);

    return this;
  }
})
