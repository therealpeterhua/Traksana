Trak.Views.ProjectsIndexItem = Backbone.View.extend({
  template: JST['sidebar/projects/projects_index_item'],
  tagName: 'li',
  className: 'project-item',

  events: {
    'click': 'showProject',
  },

  initialize: function(options) {
    this.$el.attr('data-project-id', this.model.id)
    this.teamId = options.teamId
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({
      project: this.model,
      teamId: this.teamId
    });
    this.$el.html(content);

    return this;
  },

  showProject: function(e) {
    Trak.masterView.displayProject(this.model);
  },

})
