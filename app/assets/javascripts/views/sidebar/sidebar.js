Trak.Views.Sidebar = Backbone.CompositeView.extend({
  template: JST['sidebar/sidebar'],
  addClass: 'sidebar',

  events: {
    'resizeMe div.sidebar-body': 'resizeProjIndex',
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({team: this.model});
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

    var projectNewView = new Trak.Views.ProjectNew({
      model: new Trak.Models.Project({
        team_id: this.model.id
      }),
      collection: this.model.projects()
    });

    this.addSubview("div.members-index", membersIndexView);
    this.addSubview("div.projects-index", projectsIndexView);
    this.addSubview('div.new-project', projectNewView);
  },

  setSizeAndListener: function() {
    this.resizeProjIndex();
    $(window).on("resize",this.resizeProjIndex.bind(this));
  },

  resizeProjIndex: function() {
    var parentHeight = this.$('div.sidebar-body').height();
    var teamMembersHeight = $('ul.team-member-items').height();
    this.$('div.projects-index').height(
      parentHeight - 82 - teamMembersHeight
    );
  },

})
