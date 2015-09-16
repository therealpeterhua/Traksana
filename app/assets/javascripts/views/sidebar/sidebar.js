Trak.Views.TeamShow = Backbone.CompositeView.extend({
  template: JST['master/team_show'],
  addClass: 'team-show',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.members(), "sync", this.render);
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
      this.addSubview("ul.team-member-items", teamMemberView);
    }.bind(this) );

    var projectSubview = new Trak.Views.ProjectsIndex({
      collection: this.model.projects(),
      teamId: this.model.id
    });

    this.addSubview("div.projects-index", projectSubview);
  }

})
