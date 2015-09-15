Trak.Views.TeamShow = Backbone.CompositeView.extend({
  template: JST['teams/team_show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({team: this.model});
    this.$el.html(content);
    this.populateSubviews();

    return this;
  },

  populateSubviews: function() {
    this.model.members().each( function(member) {
      var teamMemberView = new Trak.Views.TeamMemberItem({model: member});
      this.addSubview("ul.team-member-item", teamMemberView);
    }.bind(this) );
  }

})
