Trak.Views.Sidebar = Backbone.CompositeView.extend({
  template: JST['sidebar/sidebar'],
  addClass: 'sidebar',

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);     //PH -- rem this is team
    //PH** Will want to abstract into its own view for name changing
    //PH** You actually do need to listen for sync here -- after the team#show finishes fetching, you'll need to refresh this page
  },

  render: function() {
    var content = this.template({team: this.model});
    //PH** - QUESTION: should I extrapolate the title into its own view?
    //Don't I need this to refresh if the .members() changes?
    this.$el.html(content);
    this.populateSections();
    // debugger;

    return this;
  },

  populateSections: function() {
    var membersIndexView = new Trak.Views.TeamMemberIndex({
      collection: this.model.members()
    });

    var projectsIndexView = new Trak.Views.ProjectsIndex({
      collection: this.model.projects(),
      teamId: this.model.id
    });

    this.addSubview("div.members-index", membersIndexView);
    this.addSubview("div.projects-index", projectsIndexView);
  }

})
