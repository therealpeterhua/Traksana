Trak.Views.ProjectEdit = Backbone.View.extend({
  template: JST['modals/project_edit/project_edit'],
  className: 'project-editing',

  events: {
    'submit form': 'submitEdits',
    'click button.delete-project': 'deleteProject',
  },

  render: function() {
    var content = this.template({ project: this.model });
    this.$el.html(content);

    return this;
  },

  submitEdits: function(e) {
    e.preventDefault();
    var attr = $(e.currentTarget).serializeJSON().project;
    this.model.set(attr);

    this.model.save({}, {
      success: function() {
        Trak.masterView.toggleModal();
      },
    });
  },

  deleteProject: function(e) {
    e.preventDefault();
    this.model.destroy({
      success: function() {
        Trak.masterView.toggleModal();
      },
    });
    this.$el.trigger('projectDelete');
  }
})
