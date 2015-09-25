Trak.Views.Sidebar = Backbone.CompositeView.extend({
  template: JST['sidebar/sidebar'],
  addClass: 'sidebar',

  events: {
    'refreshProjNewView form.new-project': 'refreshProjNewView',
    'resize div.sidebar-body': 'setSizeAndListener'
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);     //PH -- rem this is team
    //PH** Will want to abstract into its own view for name changing
    //PH** You actually do need to listen for sync here -- after the team#show finishes fetching, you'll need to refresh this page
  },

  render: function() {
    // alert('sidebar render triggered');
    var content = this.template({team: this.model});
    //PH** - QUESTION: should I extrapolate the title into its own view?
    //Don't I need this to refresh if the .members() changes?
    this.$el.html(content);
    this.populateSections();
    this.setSizeAndListener();

    return this;
  },

  populateSections: function() {
    var membersIndexView = new Trak.Views.TeamMemberIndex({
      collection: this.model.members()
    });

    var projectsIndexView = new Trak.Views.ProjectsIndex({
      collection: this.model.projects()
    });

    this.addSubview("div.members-index", membersIndexView);
    this.addSubview("div.projects-index", projectsIndexView);
    this.refreshProjNewView();      //add in a projNewView
  },

  refreshProjNewView: function() {
    this._newProjectView &&
        this.removeSubview('div.new-project', this._newProjectView);

    this._newProjectView = new Trak.Views.ProjectNew({
      model: new Trak.Models.Project({
        team_id: this.model.id
      }),
      collection: this.model.projects()
    });

    this.addSubview('div.new-project', this._newProjectView);
  },

  setSizeAndListener: function() {
    this.resizeProjIndex();
    $(window).on("resize",this.resizeProjIndex.bind(this));
  },

  resizeProjIndex: function() {
    var parentLength = this.$('div.sidebar-body').height();
    this.$('div.projects-index').height(parentLength - 117);
  },

})
