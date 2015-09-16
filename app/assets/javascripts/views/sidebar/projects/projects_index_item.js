Trak.Views.ProjectsIndexItem = Backbone.View.extend({
  template: JST['sidebar/projects/projects_index_item'],
  tagName: 'li',

  events: {
    "click": "displayProject"
  },

  initialize: function(options) {
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

  displayProject: function() {
    var projectShow = new Trak.Views.ProjectShow({
      model: this.model
    });

    // this.$el.find(".centerpiece").html(projectShow.render().$el);
  }
})
