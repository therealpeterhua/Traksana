Trak.Views.ProjectShow = Backbone.CompositeView.extend({
  template: JST['centerpiece/project_show'],

  initialize: function() {
    this.listenTo(this.model, 'change:code_name', this.render);
  },

  render: function() {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.populateTaskIndex();

    return this;
  },

  populateTaskIndex: function() {
    var tasksIndexView = new Trak.Views.TasksIndex({
      collection: this.model.tasks(),
      projectId: this.model.id
    });

    this.addSubview("div.tasks-index-container", tasksIndexView);
  },
})
