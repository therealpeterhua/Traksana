Trak.Views.TeamSelect = Backbone.CompositeView.extend({
  template: JST['navbar/teams/team_select'],
  className: 'team-select',

  initialize: function() {
    this.listenTo(Trak.currentUser.teams(), 'sync', this.render);
    this.collection = Trak.currentUser.teams();
  },

  render: function() {
    var content = this.template({ collection: this.collection });
    this.$el.html(content);
    this.populateTeamItems();

    return this;
  },

  populateTeamItems: function() {
    debugger
    this.collection.each( function(team) {
      var teamSelectItem = new Trak.Views.TeamSelectItem({ model: team });
      this.addSubview('ul.team-select-items', teamSelectItem);
    }.bind(this) );
  },
})
