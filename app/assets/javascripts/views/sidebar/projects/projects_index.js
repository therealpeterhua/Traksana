Trak.Views.ProjectsIndex = Backbone.CompositeView.extend({
  template: JST['sidebar/projects/projects_index'],

  events: {
    'click li': 'emphasizeProject',
  },

  initialize: function(options) {
    this.teamId = options.teamId;
    this.listenTo(this.collection, "sync remove", this.render);
    //PH** if don't have "sync" here, it doesn't update when I save new project!
  },

  render: function() {
    var content = this.template({projects: this.collection});
    this.$el.html(content);
    this.populateSubviews();
    this.checkEmphasized();

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
  },
  //PH**** - sort out naming conventions here - index item, etc.

  emphasizeProject: function(e) {
    this.$('li').removeClass('clicked-project');
    var clickedProj = $(e.currentTarget);
    clickedProj.addClass('clicked-project');
    this.currProjId = $(e.currentTarget).data('project-id');
  },

  checkEmphasized: function() {
    if (this.currProjId) {
      var $el = this.$("li[data-project-id='" + this.currProjId + "']")
      $el.addClass('clicked-project');
    }
  },

})
