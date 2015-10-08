Trak.Views.ProjectEdit = Backbone.View.extend({
  template: JST['modals/project_edit/project_edit'],
  className: 'edit-project',

  events: {
    'submit form': 'submitEdits',
  },

  render: function() {
    var content = this.template({ project: this.model });
    this.$el.html(content);

    return this;
  },

  submitEdits: function(e) {
    debugger;
    e.preventDefault();
    var attr = $(e.currentTarget).serializeJSON().project;
    this.model.set(attr);

    this.model.save({}, {
      success: function() {
        console.log('Successfully saved!');
      }
    });
  },

  deleteProject: function(e) {
    e.preventDefault();
    this.model.destroy();
    Backbone.history().navigate()
  }
})
