Trak.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['projects/projects_index'],

  initialize: function(options) {
    this.teamId = options.teamId;
    this.listenTo(this.collection, "sync", this.render);
  },

  render: function() {
    var content = this.template({projects: this.collection});
    this.$el.html(content);
    this.populateSubviews();

    return this;
  },

  populateSubviews: function() {
    this.collection.each( function(project) {
      var projectItemView = new Trak.Views.ProjectsIndexItem({
        model: project,
        teamId: this.teamId
      });
      this.addSubview("ul.project-items", projectItemView);
    }.bind(this));

    var newProjectView = new Trak.Views.ProjectNew({
      model: new Trak.Models.Project({
        team_id: this.teamId
      }),
      collection: this.collection
    });

    this.addSubview("div.new-project", newProjectView);
  }
  //PH**** - sort out naming conventions here - index item, etc.

})
