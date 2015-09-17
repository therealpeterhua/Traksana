Trak.Views.ProjectsIndexItem = Backbone.View.extend({
  template: JST['sidebar/projects/projects_index_item'],
  tagName: 'li',
  className: 'project-item',

  events: {
    //PH** if you wanna go cowboy -- listen to clicks here and render outside the $el
  },

  initialize: function(options) {
    this.$el.data('project-id', this.model.id)
    this.teamId = options.teamId
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    var content = this.template({
      project: this.model,
      teamId: this.teamId
    });
    this.$el.html(content);       //PH NOTE #html doesn't wipe jQuery data

    return this;
  },

})
