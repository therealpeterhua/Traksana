Trak.Views.Sidebar = Backbone.CompositeView.extend({
  template: JST['sidebar/sidebar'],
  addClass: 'sidebar',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);     //PH -- rem this is team
    this.listenTo(this.model.members(), "sync", this.render);
  },

  render: function() {
    var content = this.template({team: this.model});
    //PH** - QUESTION: should I extrapolate the title into its own view?
    //Don't I need this to refresh if the .members() changes?
    this.$el.html(content);
    this.populateSections();

    return this;
  },

  populateSections: function() {
    var membersSubview = new Trak.Views.TeamMemberIndex({
      collection: this.model.members()
    });

    var projectsSubview = new Trak.Views.ProjectsIndex({
      collection: this.model.projects(),
      teamId: this.model.id
    });

    this.addSubview("div.members-index", membersSubview);
    this.addSubview("div.projects-index", projectsSubview);
  }

})
