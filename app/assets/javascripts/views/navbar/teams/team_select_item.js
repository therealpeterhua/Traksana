Trak.Views.TeamSelectItem = Backbone.View.extend({
  template: JST['navbar/teams/team_select_item'],
  className: 'team-select-item',
  tagName: 'li',

  events: {
    'click': 'navigateToTeamView',
    'mouseenter': 'toggleHovered',
    'mouseleave': 'toggleHovered',
  },

  initialize: function() {
    this.listenTo(this.model, 'sync', this.render);
    this.$el.data('team-id', this.model.id);
  },

  render: function() {
    var content = this.template({ team: this.model });
    this.$el.html(content);

    return this;
  },

  navigateToTeamView: function(e) {
    Backbone.history.navigate('#/teams/' + this.model.id, { trigger: true });
  },

  toggleHovered: function(e) {
    this.$el.toggleClass('hovered');
  },
})
